import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { uploadFile } from "@/lib/telegram/upload";
import { generateThumbnail, getImageDimensions } from "@/lib/thumbnails";
import { CHANNEL_ID } from "@/lib/telegram/bot";
import { checkUploadRateLimit } from "@/lib/rate-limit";

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

function sanitizeFileName(name: string): string {
  // Strip path separators and traversal
  let sanitized = name.replace(/[/\\]/g, "_");
  // Remove null bytes and control characters
  sanitized = sanitized.replace(/[\x00-\x1f\x7f]/g, "");
  // Truncate to 255 characters preserving extension
  if (sanitized.length > 255) {
    const dotIndex = sanitized.lastIndexOf(".");
    if (dotIndex > 0) {
      const ext = sanitized.slice(dotIndex);
      sanitized = sanitized.slice(0, 255 - ext.length) + ext;
    } else {
      sanitized = sanitized.slice(0, 255);
    }
  }
  return sanitized || "unnamed_file";
}

function sanitizeMimeType(type: string): string {
  if (
    /^[a-zA-Z0-9][a-zA-Z0-9!#$&\-^_.+]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-^_.+]*$/.test(
      type
    )
  ) {
    return type;
  }
  return "application/octet-stream";
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get("folderId");
  const photosOnly = searchParams.get("photosOnly") === "true";
  const favoritesOnly = searchParams.get("favoritesOnly") === "true";

  try {
    if (photosOnly) {
      const photos = await prisma.file.findMany({
        where: {
          userId: user.userId,
          OR: [{ isImage: true }, { isVideo: true }],
        },
        orderBy: [{ dateTaken: "desc" }, { createdAt: "desc" }],
        include: { tags: { include: { tag: true } } },
      });

      return NextResponse.json({
        photos: photos.map(serializeFile),
      });
    }

    if (favoritesOnly) {
      const files = await prisma.file.findMany({
        where: { userId: user.userId, isFavorite: true },
        orderBy: { createdAt: "desc" },
        include: { tags: { include: { tag: true } } },
      });

      return NextResponse.json({
        files: files.map(serializeFile),
      });
    }

    // Default: list files and folders in a directory
    const [files, folders] = await Promise.all([
      prisma.file.findMany({
        where: { userId: user.userId, folderId: folderId || null },
        orderBy: { createdAt: "desc" },
        include: { tags: { include: { tag: true } } },
      }),
      prisma.folder.findMany({
        where: { userId: user.userId, parentId: folderId || null },
        orderBy: { name: "asc" },
        include: { _count: { select: { files: true, children: true } } },
      }),
    ]);

    return NextResponse.json({
      files: files.map(serializeFile),
      folders: folders.map((f) => ({
        ...f,
        createdAt: f.createdAt.toISOString(),
        updatedAt: undefined,
      })),
    });
  } catch (error) {
    console.error("List files error:", error);
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!checkUploadRateLimit(user.userId)) {
    return NextResponse.json(
      { error: "Too many uploads. Please wait a moment." },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folderId = formData.get("folderId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds maximum size of 2GB" },
        { status: 413 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "File is empty" },
        { status: 400 }
      );
    }

    const safeName = sanitizeFileName(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = sanitizeMimeType(file.type || "application/octet-stream");
    const isImage = mimeType.startsWith("image/");
    const isVideo = mimeType.startsWith("video/");

    // Upload to Telegram
    const { telegramFileId, telegramMessageId } = await uploadFile(
      buffer,
      safeName,
      mimeType
    );

    // Generate thumbnail and get dimensions for images
    let thumbnailFileId: string | null = null;
    let thumbnailMessageId: number | null = null;
    let dimensions: { width: number; height: number } | null = null;

    if (isImage) {
      dimensions = await getImageDimensions(buffer);

      const thumbnail = await generateThumbnail(buffer, mimeType);
      if (thumbnail) {
        try {
          const botToken = process.env.BOT_TOKEN;
          if (botToken) {
            const thumbForm = new FormData();
            thumbForm.append("chat_id", CHANNEL_ID);
            thumbForm.append("caption", `thumbnail:${safeName}`);
            thumbForm.append(
              "photo",
              new Blob([new Uint8Array(thumbnail)], { type: "image/webp" }),
              `thumb_${safeName}.webp`
            );

            const thumbRes = await fetch(
              `https://api.telegram.org/bot${botToken}/sendPhoto`,
              { method: "POST", body: thumbForm }
            );
            const thumbData = await thumbRes.json();
            if (thumbData.ok && thumbData.result.photo?.length > 0) {
              thumbnailFileId =
                thumbData.result.photo[thumbData.result.photo.length - 1].file_id;
              thumbnailMessageId = thumbData.result.message_id;
            }
          }
        } catch {
          console.error("Failed to upload thumbnail to Telegram");
        }
      }
    }

    // Save to database
    const dbFile = await prisma.file.create({
      data: {
        originalName: safeName,
        mimeType,
        size: BigInt(file.size),
        telegramFileId,
        telegramMessageId,
        thumbnailFileId,
        thumbnailMessageId,
        isImage,
        isVideo,
        width: dimensions?.width || null,
        height: dimensions?.height || null,
        folderId: folderId || null,
        userId: user.userId,
      },
    });

    return NextResponse.json(serializeFile(dbFile), { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeFile(file: any) {
  return {
    id: file.id,
    originalName: file.originalName,
    mimeType: file.mimeType,
    size: file.size.toString(),
    isImage: file.isImage,
    isVideo: file.isVideo,
    isFavorite: file.isFavorite,
    folderId: file.folderId,
    thumbnailFileId: file.thumbnailFileId,
    width: file.width,
    height: file.height,
    createdAt: file.createdAt.toISOString(),
    dateTaken: file.dateTaken?.toISOString() || null,
    tags: file.tags?.map((ft: { tag: { id: string; name: string } }) => ({
      id: ft.tag.id,
      name: ft.tag.name,
    })) || [],
  };
}
