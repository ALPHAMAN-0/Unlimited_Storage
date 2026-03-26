import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parentId = searchParams.get("parentId");

  const folders = await prisma.folder.findMany({
    where: { userId: user.userId, parentId: parentId || null },
    orderBy: { name: "asc" },
    include: { _count: { select: { files: true, children: true } } },
  });

  return NextResponse.json({ folders });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, parentId } = await request.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
  }

  try {
    const folder = await prisma.folder.create({
      data: {
        name: name.trim(),
        parentId: parentId || null,
        userId: user.userId,
      },
    });

    return NextResponse.json(folder, { status: 201 });
  } catch (error) {
    // Check for unique constraint violation
    if (String(error).includes("Unique constraint")) {
      return NextResponse.json(
        { error: "A folder with this name already exists here" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 });
  }
}
