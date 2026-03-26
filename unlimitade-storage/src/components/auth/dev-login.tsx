"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DevLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (process.env.NODE_ENV !== "development") return null;

  const handleDevLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/dev", { method: "POST" });
      if (res.ok) {
        router.push("/drive");
      }
    } catch (error) {
      console.error("Dev login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <p className="text-xs text-gray-400 mb-2">Development only</p>
      <button
        onClick={handleDevLogin}
        disabled={loading}
        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 text-sm"
      >
        {loading ? "Logging in..." : "Dev Login"}
      </button>
    </div>
  );
}
