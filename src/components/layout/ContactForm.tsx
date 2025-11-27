"use client";

import { sendContactEmail } from "@/app/actions";
import {
  ContactFormValues,
  contactSchema,
  initialState,
} from "@/src/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [serverState, setServerState] = useState(initialState);

  // Configuração do React Hook Form com Zod
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Função de envio
  function onSubmit(data: ContactFormValues) {
    startTransition(async () => {
      // Prepara o FormData para o Server Action
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone || "");
      formData.append("message", data.message);

      // Chama Server Action
      const result = await sendContactEmail(initialState, formData);
      setServerState(result);

      // Se sucesso, limpa form
      if (result.status === "success") {
        form.reset();
      }
    });
  }

  return (
    <div className="border-redaiu-blue-500 h-full rounded-xl border border-t-4 bg-white p-8 shadow-sm">
      <h3 className="text-redaiu-blue-700 mb-6 text-2xl font-bold tracking-wide uppercase">
        Envíanos un mensaje
      </h3>

      {/* Feedback de Sucesso */}
      {serverState.status === "success" && (
        <div className="animate-in fade-in slide-in-from-top-2 mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">¡Mensaje enviado!</p>
            <p className="text-sm text-green-700">{serverState.message}</p>
          </div>
        </div>
      )}

      {/* Feedback de Erro Geral */}
      {serverState.status === "error" && (
        <div className="animate-in fade-in slide-in-from-top-2 mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Ocurrió un error</p>
            <p className="text-sm text-red-700">{serverState.message}</p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Campo Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tu nombre"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo Telefone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+598 ..."
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Campo Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu@email.com"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Mensagem */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="¿En qué podemos ayudarte?"
                    className="min-h-[120px] resize-none"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-redaiu-blue-700 hover:bg-redaiu-blue-600 w-full py-6 text-lg"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Mensaje"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
