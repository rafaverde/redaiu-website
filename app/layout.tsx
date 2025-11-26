import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { getMenuCompanies } from "@/src/lib/api/menu";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Red de Arquitectura e Ingeniería de Uruguay",
  description:
    "Empresas de arquitectura e ingeniería de Uruguay para ofrecer soluciones más completas, innovadoras y sostenibles en todo el mundo.",
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
        <Header companies={companies} />
        <main>{children}</main>
        <Footer companies={companies} />
      </body>
    </html>
  );
}
