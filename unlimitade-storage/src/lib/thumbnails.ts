import sharp from "sharp";

export async function generateThumbnail(
  buffer: Buffer,
  mimeType: string
): Promise<Buffer | null> {
  if (!mimeType.startsWith("image/")) return null;

  try {
    const thumbnail = await sharp(buffer)
      .resize(400, 400, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    return thumbnail;
  } catch {
    console.error("Failed to generate thumbnail");
    return null;
  }
}

export async function getImageDimensions(
  buffer: Buffer
): Promise<{ width: number; height: number } | null> {
  try {
    const metadata = await sharp(buffer).metadata();
    if (metadata.width && metadata.height) {
      return { width: metadata.width, height: metadata.height };
    }
    return null;
  } catch {
    return null;
  }
}

export function extractExifDate(buffer: Buffer): Date | null {
  try {
    // exifr is ESM-only, use dynamic import
    // For now, return null and implement when wiring up the upload route
    return null;
  } catch {
    return null;
  }
}
