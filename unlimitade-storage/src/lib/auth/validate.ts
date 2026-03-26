import crypto from "crypto";

interface TelegramLoginData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export function validateTelegramLogin(
  data: TelegramLoginData
): boolean {
  const botToken = process.env.BOT_TOKEN;
  if (!botToken) throw new Error("BOT_TOKEN is required");

  // Create the secret key: SHA-256 of the bot token
  const secretKey = crypto.createHash("sha256").update(botToken).digest();

  // Build the data-check-string: sorted key=value pairs (excluding hash)
  const checkString = Object.entries(data)
    .filter(([key]) => key !== "hash")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  // HMAC-SHA-256 of the data-check-string
  const hmac = crypto
    .createHmac("sha256", secretKey)
    .update(checkString)
    .digest("hex");

  // Compare with the provided hash
  if (hmac !== data.hash) return false;

  // Check that auth_date is not too old (allow 1 day)
  const now = Math.floor(Date.now() / 1000);
  if (now - data.auth_date > 86400) return false;

  return true;
}

export type { TelegramLoginData };
