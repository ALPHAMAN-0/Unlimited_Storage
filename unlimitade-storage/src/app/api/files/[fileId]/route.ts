import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { bot, CHANNEL_ID } from "@/lib/telegram/bot";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileId } = await params;

  const file = await prisma.file.findFirst({
    where: { id: fileId, userId: user.userId },
    include: { tags: { include: { tag: true } } },
  });

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...file,
    size: file.size.toString(),
    createdAt: file.createdAt.toISOString(),
    dateTaken: file.dateTaken?.toISOString() || null,
    tags: file.tags.map((ft) => ({ id: ft.tag.id, name: ft.tag.name })),
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileId } = await params;
  const body = await request.json();

  const file = await prisma.file.findFirst({
    where: { id: fileId, userId: user.userId },
  });

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Handle different update types
  const updateData: Record<string, unknown> = {};

  if (body.originalName !== undefined) updateData.originalName = body.originalName;
  if (body.folderId !== undefined) updateData.folderId = body.folderId || null;
  if (body.isFavorite !== undefined) updateData.isFavorite = body.isFavorite;

  const updated = await prisma.file.update({
    where: { id: fileId },
    data: updateData,
  });

  // Handle tags
  if (body.addTags) {
    for (const tagName of body.addTags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        create: { name: tagName },
        update: {},
      });
      await prisma.fileTag.upsert({
        where: { fileId_tagId: { fileId, tagId: tag.id } },
        create: { fileId, tagId: tag.id },
        update: {},
      });
    }
  }

  if (body.removeTags) {
    for (const tagName of body.removeTags) {
      const tag = await prisma.tag.findUnique({ where: { name: tagName } });
      if (tag) {
        await prisma.fileTag.deleteMany({
          where: { fileId, tagId: tag.id },
        });
      }
    }
  }

  return NextResponse.json({
    ...updated,
    size: updated.size.toString(),
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileId } = await params;

  const file = await prisma.file.findFirst({
    where: { id: fileId, userId: user.userId },
  });

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Delete file and thumbnail from Telegram channel
  try {
    await bot.api.deleteMessage(CHANNEL_ID, file.telegramMessageId);
  } catch {
    console.error("Failed to delete Telegram file message");
  }

  if (file.thumbnailMessageId) {
    try {
      await bot.api.deleteMessage(CHANNEL_ID, file.thumbnailMessageId);
    } catch {
      console.error("Failed to delete Telegram thumbnail message");
    }
  }

  // Delete from database
  await prisma.file.delete({ where: { id: fileId } });

  return NextResponse.json({ success: true });
}
