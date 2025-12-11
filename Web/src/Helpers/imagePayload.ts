import { fileToBase64 } from "./imageEncoder"

// 5MB
const MAX_SIZE_BYTES = 5 * 1024 * 1024

export async function prepareImagePayload(
  file: File,
): Promise<{ imageContent: string; fileName: string }> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selected file must be an image.")
  }

  if (file.size > MAX_SIZE_BYTES) {
    const maxSizeMB = (MAX_SIZE_BYTES / 1024 / 1024).toFixed(0)
    throw new Error(`Image file is too large (max ${maxSizeMB}MB).`)
  }

  const base64Content = await fileToBase64(file)

  return {
    imageContent: base64Content,
    fileName: file.name,
  }
}
