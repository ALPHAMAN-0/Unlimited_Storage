import { Bot, InputFile } from "grammy";

const globalForBot = globalThis as unknown as {
  bot: Bot | undefined;
};

function createBot(): Bot {
  const token = process.env.BOT_TOKEN;
  if (!token) throw new Error("BOT_TOKEN environment variable is required");
  return new Bot(token);
}

export const bot = globalForBot.bot ?? createBot();

if (process.env.NODE_ENV !== "production") globalForBot.bot = bot;

export const CHANNEL_ID = process.env.CHANNEL_ID || "";

export { InputFile };
