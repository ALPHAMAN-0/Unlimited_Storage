import { bot, CHANNEL_ID } from "./bot";
import { getMtprotoClient } from "./mtproto";

const FIFTY_MB = 50 * 1024 * 1024;

interface UploadResult {
  telegramFileId: string;
  telegramMessageId: number;
}

export async function uploadFile(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<UploadResult> {
  if (buffer.length <= FIFTY_MB) {
    return uploadViaBotApi(buffer, filename, mimeType);
  }
  return uploadViaMtproto(buffer, filename, mimeType);
}

async function uploadViaBotApi(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<UploadResult> {
  // Use raw fetch to Telegram Bot API to avoid InputFile bundling issues with Next.js
  const botToken = process.env.BOT_TOKEN;
  if (!botToken) throw new Error("BOT_TOKEN is required");

  const formData = new FormData();
  formData.append("chat_id", CHANNEL_ID);
  formData.append("caption", filename);
  formData.append(
    "document",
    new Blob([buffer], { type: mimeType }),
    filename
  );

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/sendDocument`,
    { method: "POST", body: formData }
  );

  const data = await res.json();
  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description}`);
  }

  const doc = data.result.document;
  if (!doc) throw new Error("Upload failed: no document in response");

  return {
    telegramFileId: doc.file_id,
    telegramMessageId: data.result.message_id,
  };
}

async function uploadViaMtproto(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<UploadResult> {
  const client = await getMtprotoClient();
  const channelId = CHANNEL_ID;

  const result = await client.sendFile(channelId, {
    file: buffer,
    caption: filename,
    workers: 3,
  });

  const messageId =
    typeof result.id === "number" ? result.id : parseInt(String(result.id));

  // Extract file_id by re-fetching via bot API
  // MTProto doesn't return a bot-compatible file_id directly
  // We use the message ID to get the document via bot API
  const botMessage = await bot.api.forwardMessage(
    CHANNEL_ID,
    CHANNEL_ID,
    messageId
  );

  const doc = botMessage.document;
  if (!doc) throw new Error("MTProto upload: failed to get file_id");

  // Delete the forwarded copy
  await bot.api.deleteMessage(CHANNEL_ID, botMessage.message_id);

  return {
    telegramFileId: doc.file_id,
    telegramMessageId: messageId,
  };
}
