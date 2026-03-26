import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { bot } from "@/lib/telegram/bot";

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
  });

  if (!file || !file.thumbnailFileId) {
    return NextResponse.json({ error: "Thumbnail not found" }, { status: 404 });
  }

  try {
    const telegramFile = await bot.api.getFile(file.thumbnailFileId);
    const filePath = telegramFile.file_path;
    if (!filePath) throw new Error("No file path");

    const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
    const response = await fetch(url);

    if (!response.ok || !response.body) {
      throw new Error("Failed to fetch thumbnail");
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Thumbnail error:", error);
    return NextResponse.json({ error: "Thumbnail fetch failed" }, { status: 500 });
  }
}
