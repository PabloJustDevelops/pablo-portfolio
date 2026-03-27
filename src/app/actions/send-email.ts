"use server";

import { Resend } from "resend";
import { contactFormSchema, ContactFormValues } from "@/lib/schemas";

// Inicializamos Resend solo si existe la API Key, para evitar errores en desarrollo sin env
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendEmail(data: ContactFormValues) {
  // Validamos los datos en el servidor
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { error: "Datos inválidos. Por favor, revisa el formulario." };
  }

  // Si no hay API Key configurada, simulamos el éxito (para desarrollo)
  if (!resend) {
    console.log("⚠️ SIMULACIÓN DE ENVÍO DE EMAIL (Falta RESEND_API_KEY) ⚠️");
    console.log("Datos:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular delay de red
    return { success: true, message: "Mensaje enviado con éxito (Simulación)" };
  }

  try {
    const { name, email, message } = result.data;
    
    // Enviamos el email usando Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["pablolopez2001@outlook.es"], 
      subject: `Nuevo mensaje de ${name} desde el Portfolio`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      replyTo: email,
    });

    if (error) {
      console.error("Error enviando email con Resend:", error);
      return { error: "Hubo un problema al enviar el email. Inténtalo más tarde." };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error("Error inesperado:", error);
    return { error: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo." };
  }
}
