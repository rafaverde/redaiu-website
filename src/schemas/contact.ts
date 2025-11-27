import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.email({ message: "Por favor ingrese un correo electrónico válido" }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "El mensaje deve tener al menos 10 caracteres." }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

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
