// Client-only helpers for preparing an image file for upload.
// Large photos are downscaled in the browser (via canvas) before sending, so
// uploads stay small and fast even from a phone camera. This file must never
// import server-only modules — it runs in the browser (admin UI).

export type UploadPayload = {
  filename: string;
  contentType: string;
  dataBase64: string;
};

const MAX_DIM = 2200;
const JPEG_QUALITY = 0.85;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = () => reject(new Error("Não foi possível ler o ficheiro."));
    fr.readAsDataURL(file);
  });
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Ficheiro de imagem inválido."));
    img.src = dataUrl;
  });
}

function base64Of(dataUrl: string): string {
  return dataUrl.split(",")[1] ?? "";
}

export async function fileToUploadPayload(file: File): Promise<UploadPayload> {
  const dataUrl = await readAsDataUrl(file);

  // Animated GIF / AVIF / unknown raster: upload as-is to preserve format.
  const canDownscale = /^image\/(jpeg|png|webp)$/.test(file.type);
  if (!canDownscale) {
    return {
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      dataBase64: base64Of(dataUrl),
    };
  }

  const img = await loadImage(dataUrl);
  const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));

  // Already small enough — skip re-encoding to keep original quality.
  if (scale === 1 && file.size < 1_200_000) {
    return { filename: file.name, contentType: file.type, dataBase64: base64Of(dataUrl) };
  }

  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { filename: file.name, contentType: file.type, dataBase64: base64Of(dataUrl) };
  }
  ctx.drawImage(img, 0, 0, w, h);

  // Preserve transparency for PNG; otherwise re-encode as JPEG (smaller).
  const keepPng = file.type === "image/png";
  const outType = keepPng ? "image/png" : "image/jpeg";
  const outUrl = canvas.toDataURL(outType, keepPng ? undefined : JPEG_QUALITY);
  const ext = keepPng ? ".png" : ".jpg";
  const base = file.name.replace(/\.[^.]+$/, "");
  return { filename: base + ext, contentType: outType, dataBase64: base64Of(outUrl) };
}
