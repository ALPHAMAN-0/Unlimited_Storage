import { bot } from "./bot";

/**
 * Download a file from Telegram via Bot API.
 * Note: Bot API supports downloading files up to 20MB.
 * For larger files, a local Bot API server or MTProto is needed.
 * See: https://core.telegram.org/bots/api#getfile
 */
export async function downloadFile(
  telegramFileId: string,
  _fileSize: number
): Promise<ReadableStream<Uint8Array>> {
  const file = await bot.api.getFile(telegramFileId);
  const filePath = file.file_path;
  if (!filePath) throw new Error("Could not get file path from Telegram");

  const url = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error(`Failed to download file from Telegram: ${response.status}`);
  }

  return response.body;
}
