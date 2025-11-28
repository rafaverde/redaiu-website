"use server";

import { contactSchema, State } from "@/src/schemas/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(
  prevState: State,
  formData: FormData,
): Promise<State> {
  // Validar os dados do FormData com Zod
  const validateFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  // Se a validação falhar, retornar erros para o front
  if (!validateFields.success) {
    return {
      status: "error",
      message: "Por favor, revise los campos del formulario.",
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, message } = validateFields.data;

  try {
    const data = await resend.emails.send({
      from: "Contacto Red AIU Web <noreply@redaui.com.uy>",
      to: [process.env.CONTACT_EMAIL_TO as string],
      replyTo: email,
      subject: `Nuevo contacto web: ${name}`,
      html: `
      <div style="font-family: sans-serif; font-size: 16px; color: #333;">
          <h2>Nuevo mensaje de contacto</h2>
          <p>Has recibido una nueva consulta a través del sitio web.</p>
          <hr />
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || "N/A"}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
        </div>
      `,
    });

    if (data.error) {
      console.error("Erro Resend: ", data.error);
      return {
        status: "error",
        message: "Error al enviar el correo. Por favor intente nuevamente.",
      };
    }

    return {
      status: "success",
      message: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
    };
  } catch (err) {
    console.error("Erro Server Action:", err);
    return {
      status: "error",
      message: "Ocurrió un error inesperado.",
    };
  }
}
