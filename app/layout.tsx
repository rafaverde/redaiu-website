import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Red de Arquitectura e Ingeniería de Uruguay",
  description:
    "Empresas de arquitectura e ingeniería de Uruguay para ofrecer soluciones más completas, innovadoras y sostenibles en todo el mundo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable}  antialiased`}>{children}</body>
    </html>
  );
}
