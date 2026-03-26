import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import readline from "readline";

const apiId = parseInt(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("\n--- Telegram Session Generator ---\n");

  const session = new StringSession("");
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await ask("Enter your phone number (with country code, e.g. +880...): "),
    password: async () => await ask("Enter your 2FA password (if enabled, otherwise press Enter): "),
    phoneCode: async () => await ask("Enter the code Telegram sent you: "),
    onError: (err) => console.error("Error:", err.message),
  });

  console.log("\n✅ Authenticated successfully!\n");

  const sessionString = client.session.save();
  console.log("Your TELEGRAM_SESSION value:\n");
  console.log(sessionString);
  console.log("\nCopy the above string and paste it in your .env file as TELEGRAM_SESSION.\n");

  await client.disconnect();
  rl.close();
}

main().catch(console.error);
