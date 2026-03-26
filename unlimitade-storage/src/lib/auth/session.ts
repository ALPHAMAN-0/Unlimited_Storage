import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId?: string;
  telegramId?: number;
  firstName?: string;
  photoUrl?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || "change-this-to-a-random-32-char-secret!!",
  cookieName: "unlimitade-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function getCurrentUser(): Promise<SessionData | null> {
  const session = await getSession();
  if (!session.userId) return null;
  return {
    userId: session.userId,
    telegramId: session.telegramId,
    firstName: session.firstName,
    photoUrl: session.photoUrl,
  };
}
