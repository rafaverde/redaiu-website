import Link from "next/link";
import { NAV_ITEMS } from "../lib/constants";
import Logo from "./layout/Logo";
import { CircleSmall, Mail, PhoneCall } from "lucide-react";
import { getGlobalData } from "../lib/api/global";
import Image from "next/image";

export default async function Footer() {
  const globalData = await getGlobalData();

  if (!globalData) {
    return null;
  }

  return (
    <footer className="bg-redaiu-gray-800">
      <div className="container mx-auto px-4 md:p-0">
        <div className="border-redaiu-gray-500 grid grid-cols-1 gap-8 border-b py-16 md:grid-cols-3 md:gap-15">
          <div className="flex flex-col gap-2">
            <Logo />
            <p className="text-sm">
              Una Red Empresarial integrada por 7 empresas uruguayas líderes en
              los sectores de arquitectura e ingeniería y socias de la Cámara
              Uruguaya de Servicios de Arquitectura e Ingeniería (CUSAI).
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs uppercase">Navegar</h3>
            <nav className="flex flex-col items-start gap-2">
              {NAV_ITEMS.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`hover:text-redaiu-blue-300 flex gap-1 transition-colors duration-500`}
                  >
                    <CircleSmall className="text-redaiu-blue-300" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs uppercase">Contacto</h3>
            <div className="space-y-3">
              <div className="flex gap-1">
                <Mail className="text-redaiu-blue-300" />
                <Link
                  href={`mailto:${globalData.footerContactEmail}`}
                  className="hover:text-redaiu-blue-300 transition-colors duration-500"
                >
                  {globalData.footerContactEmail}
                </Link>
              </div>
              <div className="flex gap-1">
                <PhoneCall className="text-redaiu-blue-300" />
                <Link
                  href={`tel:${globalData.footerContactPhone}`}
                  className="hover:text-redaiu-blue-300 transition-colors duration-500"
                >
                  {globalData.footerContactPhone}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8 py-16">
          <h3 className="text-center text-xs uppercase">Apoyo</h3>
          <div className="flex flex-col items-center justify-center gap-15 md:flex-row">
            {globalData.footerSupportLogos?.nodes?.map((item, index) => (
              <div
                key={index}
                className="relative hover:opacity-100 md:opacity-80"
              >
                {item.apoiadoresFg?.logotipo?.node.sourceUrl && (
                  <Link
                    href={item.apoiadoresFg.url}
                    title={item.title}
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <Image
                      src={item.apoiadoresFg.logotipo.node.sourceUrl}
                      alt={item.apoiadoresFg.logotipo.node.altText}
                      width={150}
                      height={
                        item.apoiadoresFg.logotipo.node.mediaDetails?.height ||
                        0
                      }
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
