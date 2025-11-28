import Link from "next/link";
import Logo from "./layout/Logo";
import { ChevronRight, CircleSmall, Mail, PhoneCall } from "lucide-react";
import { getGlobalData } from "../lib/api/global";
import Image from "next/image";
import { CompanyMenuItem } from "../types/menu";
import { groupCompaniesByCategory } from "../lib/utils";
import WhyUruguay from "./home/WhyUruguay";

interface FooterProps {
  companies: CompanyMenuItem[];
}

export default async function Footer({ companies }: FooterProps) {
  const globalData = await getGlobalData();

  const groupedCompanies = groupCompaniesByCategory(companies);
  const categories = Object.keys(groupedCompanies);

  if (!globalData) {
    return null;
  }

  return (
    <>
      <WhyUruguay
        title={globalData.whyUruguayTitle}
        cards={globalData.whyUruguayCards?.nodes}
      />

      <footer className="bg-redaiu-gray-800 text-white">
        <div className="container mx-auto px-4 md:p-0">
          <div className="border-redaiu-gray-500 grid grid-cols-1 gap-8 border-b py-16 md:grid-cols-3 md:gap-15">
            <div className="flex flex-col gap-2">
              <Logo />
              <p className="text-sm">
                Una Red Empresarial integrada por 7 empresas uruguayas líderes
                en los sectores de arquitectura e ingeniería y socias de la
                Cámara Uruguaya de Servicios de Arquitectura e Ingeniería
                (CUSAI).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs uppercase">Navegar</h3>
              <nav className="flex flex-col items-start gap-2">
                <Link
                  href="/la-red"
                  className={`hover:text-redaiu-blue-300 flex items-center justify-center gap-1 transition-colors duration-500`}
                >
                  <CircleSmall className="text-redaiu-blue-300" />
                  La Red
                </Link>

                <div className="hover:text-redaiu-blue-300 flex cursor-pointer items-center justify-center gap-1 transition-colors duration-500 select-none">
                  <CircleSmall className="text-redaiu-blue-300" />
                  Empresas
                </div>

                {categories.map((category, index) => (
                  <ul key={index + category} className="space-y-4">
                    <li className="group group space-y-1 text-sm">
                      <div className="flex cursor-pointer items-center justify-center gap-1 pl-6 tracking-widest uppercase select-none">
                        <CircleSmall className="text-redaiu-blue-300 size-5" />
                        {category}
                        <ChevronRight className="size-4 rotate-90 transition-transform duration-500 ease-in-out group-hover:rotate-90 md:rotate-0" />
                      </div>
                      <div className="grid grid-rows-[1fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr] md:grid-rows-[0fr]">
                        {groupedCompanies[category].map((company, index) => (
                          <ul
                            key={index + company.title}
                            className="overflow-hidden pl-12"
                          >
                            <li>
                              <Link
                                className="hover:text-redaiu-blue-300 flex py-2 transition-colors duration-500 md:py-1"
                                key={index + company.title}
                                href={`/empresas/${company.slug}`}
                              >
                                <CircleSmall className="text-redaiu-blue-300 size-5" />
                                {company.title}
                              </Link>
                            </li>
                          </ul>
                        ))}
                      </div>
                    </li>
                  </ul>
                ))}

                <Link
                  href="/contacto"
                  className={`hover:text-redaiu-blue-300 flex items-center justify-center gap-1 transition-colors duration-500`}
                >
                  <CircleSmall className="text-redaiu-blue-300" />
                  Contacto
                </Link>
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
                          item.apoiadoresFg.logotipo.node.mediaDetails
                            ?.height || 0
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
    </>
  );
}
