const uploadCounts = new Map<
  string,
  { count: number; resetAt: number }
>();

export function checkUploadRateLimit(
  userId: string,
  maxUploads = 30,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const entry = uploadCounts.get(userId);

  if (!entry || now > entry.resetAt) {
    uploadCounts.set(userId, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxUploads) return false;
  entry.count++;
  return true;
}
