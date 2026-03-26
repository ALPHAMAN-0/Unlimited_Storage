import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  try {
    const user = await prisma.user.upsert({
      where: { telegramId: BigInt(1) },
      update: {},
      create: {
        telegramId: BigInt(1),
        firstName: "Dev",
        lastName: "User",
        username: "devuser",
        authDate: Math.floor(Date.now() / 1000),
      },
    });

    const session = await getSession();
    session.userId = user.id;
    session.telegramId = 1;
    session.firstName = "Dev";
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dev auth error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
