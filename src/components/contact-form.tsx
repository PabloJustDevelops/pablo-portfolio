"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { contactFormSchema, ContactFormValues } from "@/lib/schemas";
import { sendEmail } from "@/app/actions/send-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsPending(true);

    try {
      const result = await sendEmail(data);

      if (result.error) {
        toast.error("Error", {
          description: result.error,
        });
        return;
      }

      toast.success("¡Mensaje enviado!", {
        description: "Gracias por contactarme. Te responderé lo antes posible.",
      });
      form.reset();
    } catch (error) {
      toast.error("Error inesperado", {
        description: "Ocurrió un error al enviar tu mensaje. Inténtalo de nuevo.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700 dark:text-neutral-300">Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    {...field}
                    className="bg-white/60 dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700 dark:text-neutral-300">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu@email.com"
                    {...field}
                    className="bg-white/60 dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-blue-500/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-700 dark:text-neutral-300">Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntame sobre tu proyecto..."
                  className="min-h-[120px] bg-white/60 dark:bg-white/[0.03] border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-blue-500/20 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Enviar mensaje
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
