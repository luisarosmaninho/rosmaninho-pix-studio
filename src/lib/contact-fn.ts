import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

export type ContactInput = {
  nome: string;
  email: string;
  mensagem: string;
};

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as ContactInput)
  .handler(async ({ data }) => {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_EMAIL ?? "ola@rosmaninhofotografia.pt";

    if (!host || !user || !pass) {
      console.log(
        `[contacto] ${data.nome} <${data.email}>\n${data.mensagem}`
      );
      return { ok: true };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Rosmaninho Fotografia" <${user}>`,
      to,
      replyTo: data.email,
      subject: `Mensagem de ${data.nome} — Rosmaninho Fotografia`,
      text: `Nome: ${data.nome}\nEmail: ${data.email}\n\n${data.mensagem}`,
      html: `
        <p style="font-family:serif;color:#1a1a18">
          <strong>Nome:</strong> ${data.nome}<br>
          <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
        </p>
        <p style="font-family:serif;color:#1a1a18;margin-top:16px;white-space:pre-line">${data.mensagem}</p>
        <hr style="border:none;border-top:1px solid #ccc;margin:24px 0">
        <p style="font-family:monospace;font-size:11px;color:#999">Rosmaninho Fotografia · Coimbra</p>
      `,
    });

    return { ok: true };
  });
