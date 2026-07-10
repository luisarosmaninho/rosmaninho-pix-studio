// Client-only helpers for preparing an image file for upload.
// The original bytes are sent unaltered so the photograph is preserved
// exactly as it is saved by the photographer. This file must never import
// server-only modules — it runs in the browser (admin UI).

import { MAX_IMAGE_SIZE_BYTES } from "./upload-limits";

export type UploadPayload = {
  filename: string;
  contentType: string;
  dataBase64: string;
};

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = () => reject(new Error("Não foi possível ler o ficheiro."));
    fr.readAsDataURL(file);
  });
}

function base64Of(dataUrl: string): string {
  return dataUrl.split(",")[1] ?? "";
}

export async function fileToUploadPayload(file: File): Promise<UploadPayload> {
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(`Imagem demasiado grande (máx. ${MAX_IMAGE_SIZE_BYTES / 1024 / 1024} MB).`);
  }
  const dataUrl = await readAsDataUrl(file);
  return {
    filename: file.name,
    contentType: file.type || "application/octet-stream",
    dataBase64: base64Of(dataUrl),
  };
}
