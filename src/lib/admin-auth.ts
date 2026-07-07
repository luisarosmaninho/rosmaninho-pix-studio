/**
 * Verificação centralizada da password do admin.
 * Todos os server functions de escrita devem usar esta função.
 *
 * Em produção (NODE_ENV=production): falha imediatamente se ADMIN_PASSWORD não
 * estiver configurado — nunca usa a palavra-passe por omissão.
 *
 * Em desenvolvimento: usa "rosmaninho" por omissão com aviso na consola.
 */
export function checkAdminPassword(password: string): void {
  const envPassword = process.env.ADMIN_PASSWORD;
  const isProduction = process.env.NODE_ENV === "production";

  if (!envPassword && isProduction) {
    throw new Error(
      "ADMIN_PASSWORD não está configurado. Define o segredo em produção antes de usar o painel admin."
    );
  }

  if (!envPassword) {
    console.warn(
      "[admin] ADMIN_PASSWORD não definido — a usar palavra-passe por omissão 'rosmaninho'. " +
      "Configura o segredo em Replit → Secrets antes de publicar!"
    );
  }

  const expected = envPassword ?? "rosmaninho";
  if (password !== expected) {
    throw new Error("Password incorrecta.");
  }
}
