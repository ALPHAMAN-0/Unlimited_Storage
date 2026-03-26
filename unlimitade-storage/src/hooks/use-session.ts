"use client";

import useSWR from "swr";

interface User {
  userId: string;
  telegramId: number;
  firstName: string;
  photoUrl?: string;
}

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) return null;
    return r.json();
  });

export function useSession() {
  const { data, error, isLoading, mutate } = useSWR<User | null>(
    "/api/auth/session",
    fetcher
  );

  return {
    user: data || null,
    isLoading,
    isAuthenticated: !!data?.userId,
    error,
    mutate,
  };
}
