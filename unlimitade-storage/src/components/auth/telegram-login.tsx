"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export function TelegramLogin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");

  const handleTelegramAuth = useCallback(async (user: Record<string, unknown>) => {
    try {
      const res = await fetch("/api/auth/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        router.push("/drive");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, [router]);

  useEffect(() => {
    const botUsername = process.env.NEXT_PUBLIC_BOT_USERNAME;
    if (!botUsername || !containerRef.current) return;

    // Skip on localhost — Telegram widget doesn't work without a real domain
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      setStatus("invalid");
      return;
    }

    // Define the callback globally
    (window as unknown as Record<string, unknown>).onTelegramAuth = handleTelegramAuth;

    // Listen for message events from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === "https://oauth.telegram.org" && event.data) {
        try {
          const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
          if (data.id) {
            handleTelegramAuth(data);
          }
        } catch {
          // ignore non-JSON messages
        }
      }
    };
    window.addEventListener("message", handleMessage);

    // Load Telegram Login Widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);

    setStatus("valid");

    return () => {
      delete (window as unknown as Record<string, unknown>).onTelegramAuth;
      window.removeEventListener("message", handleMessage);
    };
  }, [handleTelegramAuth]);

  // Don't render anything on localhost
  if (status === "invalid") return null;

  return (
    <div ref={containerRef} className="flex justify-center min-h-[40px]" />
  );
}
