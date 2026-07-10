// Shared upload limits so the client and server agree on the same caps.
// Keep this file free of server-only imports so it can be imported by the
// browser-side image upload helper.

export const MAX_IMAGE_SIZE_BYTES = 20 * 1024 * 1024;
