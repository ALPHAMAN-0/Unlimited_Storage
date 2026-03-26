import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const globalForClient = globalThis as unknown as {
  mtproto: TelegramClient | undefined;
};

let clientReady = false;

function createClient(): TelegramClient {
  const apiId = parseInt(process.env.TELEGRAM_API_ID || "0");
  const apiHash = process.env.TELEGRAM_API_HASH || "";
  const session = new StringSession(process.env.TELEGRAM_SESSION || "");

  if (!apiId || !apiHash) {
    throw new Error(
      "TELEGRAM_API_ID and TELEGRAM_API_HASH environment variables are required for large file support"
    );
  }

  return new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });
}

export async function getMtprotoClient(): Promise<TelegramClient> {
  if (!globalForClient.mtproto) {
    globalForClient.mtproto = createClient();
  }

  if (!clientReady) {
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) throw new Error("BOT_TOKEN required for MTProto auth");

    await globalForClient.mtproto.start({
      botAuthToken: botToken,
    });
    clientReady = true;
  }

  return globalForClient.mtproto;
}
