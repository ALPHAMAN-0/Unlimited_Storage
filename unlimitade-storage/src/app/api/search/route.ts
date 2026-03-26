import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const type = searchParams.get("type");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  if (!q && !type) {
    return NextResponse.json({ files: [] });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { userId: user.userId };

  if (q) {
    where.originalName = { contains: q };
  }

  if (type) {
    if (type === "image") where.isImage = true;
    else if (type === "video") where.isVideo = true;
    else where.mimeType = { startsWith: type };
  }

  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) where.createdAt.gte = new Date(dateFrom);
    if (dateTo) where.createdAt.lte = new Date(dateTo);
  }

  const files = await prisma.file.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { tags: { include: { tag: true } } },
  });

  return NextResponse.json({
    files: files.map((file) => ({
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
      tags: file.tags.map((ft) => ({ id: ft.tag.id, name: ft.tag.name })),
    })),
  });
}
