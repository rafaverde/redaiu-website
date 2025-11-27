"use server";

import { contactSchema } from "@/src/schemas/contact";

// Tipo de retorno da ação
export type State = {
  status: "success" | "error" | "idle";
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

// Estado inicial para o hook useFormState
export const initialState: State = {
  status: "idle",
  message: "",
};

export async function sendContactEmail(
  prevState: State,
  formData: FormData,
): Promise<State> {
  // 1. Simular um delay de rede para ver o estado de "loading" no botão
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

  // 4. Processar o envio (Aqui entraria o Resend/Nodemailer)
  // Por enquanto, apenas logamos no servidor
  const { name, email, phone, message } = validateFields.data;

  console.log("📨 --- NOVO CONTATO RECEBIDO ---");
  console.log(`De: ${name} <${email}>`);
  console.log(`Tel: ${phone || "N/A"}`);
  console.log(`Mensagem: ${message}`);
  console.log("--------------------------------");

  // Retornar sucesso
  return {
    status: "success",
    message: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
  };
}
