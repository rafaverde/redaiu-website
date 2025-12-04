import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

import { getMenuCompanies } from "@/src/lib/api/menu";

import { Montserrat } from "next/font/google";
import "./globals.css";

import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export const revalidate = 60;

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Red de Arquitectura y Ingeniería de Uruguay",
    default: "Red de Arquitectura y Ingeniería de Uruguay",
  },

  description:
    "Empresas de arquitectura y ingeniería de Uruguay para ofrecer soluciones más completas, innovadoras y sostenibles en todo el mundo.",

  keywords: [
    "Red AIU",
    "Arquitectura Uruguay",
    "Ingeniería Uruguay",
    "Red de Arquitectura y Ingeniería",
    "Servicios de Arquitectura",
    "Ingeniería Estructural",
    "Ingeniería Vial",
    "Gerenciamiento de Proyectos",
    "Exportación de Servicios",
    "Consultoría de Construcción",
    "Diseño Arquitectónico",
    "BIM Uruguay",
    "Infraestructura",
    "Empresas de Construcción Uruguay",
    "CUSAI",
    "Proyectos Ejecutivos",
    "Sostenibilidad",
    "Arquitectos Uruguayos",
    "Ingenieros Uruguayos",
  ],

  openGraph: {
    title: "Red de Arquitectura y Ingeniería de Uruguay",
    description:
      "Empresas de arquitectura y ingeniería de Uruguay para ofrecer soluciones más completas, innovadoras y sostenibles en todo el mundo.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.redaiu.com.uy",
    siteName: "Red de Arquitectura y Ingeniería de Uruguay",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_UY",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companies = await getMenuCompanies();

  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${montserrat.className} scroll-smooth antialiased`}>
        <h1 className="sr-only">
          Red AIU - Red de Arquitectura e Ingeniería de Uruguay{" "}
        </h1>
        <Header companies={companies} />
        <main>{children}</main>
        <Footer companies={companies} />

        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GTM_ID || "error-loading-tag"}
        />
      </body>
    </html>
  );
}
