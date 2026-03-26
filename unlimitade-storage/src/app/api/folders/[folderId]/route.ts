import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { folderId } = await params;
  const body = await request.json();

  const folder = await prisma.folder.findFirst({
    where: { id: folderId, userId: user.userId },
  });

  if (!folder) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });
  }

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.parentId !== undefined) updateData.parentId = body.parentId || null;

  const updated = await prisma.folder.update({
    where: { id: folderId },
    data: updateData,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { folderId } = await params;

  const folder = await prisma.folder.findFirst({
    where: { id: folderId, userId: user.userId },
  });

  if (!folder) {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });
  }

  // Move files in this folder to parent (or root)
  await prisma.file.updateMany({
    where: { folderId },
    data: { folderId: folder.parentId },
  });

  // Move subfolders to parent
  await prisma.folder.updateMany({
    where: { parentId: folderId },
    data: { parentId: folder.parentId },
  });

  await prisma.folder.delete({ where: { id: folderId } });

  return NextResponse.json({ success: true });
}
