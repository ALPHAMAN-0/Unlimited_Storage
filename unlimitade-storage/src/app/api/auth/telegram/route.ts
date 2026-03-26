import { NextRequest, NextResponse } from "next/server";
import { validateTelegramLogin, type TelegramLoginData } from "@/lib/auth/validate";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const data: TelegramLoginData = await request.json();

    if (!validateTelegramLogin(data)) {
      return NextResponse.json({ error: "Invalid login data" }, { status: 401 });
    }

    // Upsert user in database
    const user = await prisma.user.upsert({
      where: { telegramId: BigInt(data.id) },
      update: {
        firstName: data.first_name,
        lastName: data.last_name || null,
        username: data.username || null,
        photoUrl: data.photo_url || null,
        authDate: data.auth_date,
      },
      create: {
        telegramId: BigInt(data.id),
        firstName: data.first_name,
        lastName: data.last_name || null,
        username: data.username || null,
        photoUrl: data.photo_url || null,
        authDate: data.auth_date,
      },
    });

    // Set session
    const session = await getSession();
    session.userId = user.id;
    session.telegramId = data.id;
    session.firstName = data.first_name;
    session.photoUrl = data.photo_url;
    await session.save();

    return NextResponse.json({ success: true, user: { id: user.id, firstName: user.firstName } });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
