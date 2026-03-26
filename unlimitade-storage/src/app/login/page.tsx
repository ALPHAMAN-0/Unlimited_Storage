import { TelegramLogin } from "@/components/auth/telegram-login";
import { DevLogin } from "@/components/auth/dev-login";
import { LoginThemeToggle } from "@/components/auth/login-theme-toggle";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="absolute top-4 right-4">
        <LoginThemeToggle />
      </div>

      <div className="text-center space-y-8 p-8">
        <div className="flex items-center justify-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Unlimitade Storage"
            width={48}
            height={48}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Unlimitade Storage
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          Your unlimited cloud storage powered by Telegram.
          Upload, organize, and access your files from anywhere.
        </p>

        <TelegramLogin />

        <DevLogin />

        <p className="text-sm text-gray-400">
          Sign in with your Telegram account to get started
        </p>
      </div>
    </div>
  );
}
