import { getContactoData } from "@/src/lib/api/contacto";
import { getGlobalData } from "@/src/lib/api/global";
import ContactForm from "@/src/components/layout/ContactForm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export const revalidate = 60;

export default async function ContactoPage() {
  const [pageData, globalData] = await Promise.all([
    getContactoData(),
    getGlobalData(),
  ]);

  if (!pageData) return notFound();

  const { title, contactoFg, featuredImage } = pageData;

  return (
    <>
      {/* --- HERO HEADER --- */}
      <section className="text-redaiu-gray-800 flex h-[calc(100vh-100px)] w-full items-center">
        <div className="fixed -z-100 h-full w-full">
          {featuredImage?.node?.sourceUrl && (
            <Image
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText || title}
              fill
              className="bg-redaiu-gray-800 absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="border-redaiu-blue-300 border-l-4 pl-6 text-4xl font-bold tracking-widest text-white uppercase drop-shadow-lg md:text-6xl">
            {title}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: contactoFg.introText }}
            className="mt-6 max-w-3xl leading-relaxed text-white"
          ></div>
        </div>
      </section>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="relative z-20 container mx-auto -mt-20 px-4 py-15 md:px-0">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Coluna 1: Formulário (Maior destaque) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Coluna 2: Dados Institucionais (Sidebar) */}
          <div className="border-redaiu-blue-500 flex h-full flex-col rounded-xl border-t-4 bg-white p-8 shadow-sm md:p-10 lg:col-span-5">
            <h2 className="text-redaiu-gray-800 mb-8 text-2xl font-bold tracking-wide uppercase">
              {contactoFg.institutionalDataTitle}
            </h2>

            {/* Dados vindos do ACF da Página */}
            <div
              className="prose mb-10 grow text-gray-600"
              dangerouslySetInnerHTML={{
                __html: contactoFg.institutionalDataBody,
              }}
            />

            {/* Dados vindos do Global (Backup/Reforço) */}
            <div className="space-y-6 border-t border-gray-100 pt-8">
              {globalData?.footerContactEmail && (
                <a
                  href={`mailto:${globalData.footerContactEmail}`}
                  className="group flex items-start gap-4"
                >
                  <div className="text-redaiu-blue-600 group-hover:bg-redaiu-blue-600 rounded-lg bg-blue-50 p-3 transition-colors group-hover:text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Email
                    </p>
                    <p className="group-hover:text-redaiu-blue-600 text-lg font-medium text-gray-800 transition-colors">
                      {globalData.footerContactEmail}
                    </p>
                  </div>
                </a>
              )}

              {globalData?.footerContactPhone && (
                <div className="flex items-start gap-4">
                  <div className="text-redaiu-blue-600 rounded-lg bg-blue-50 p-3">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Teléfono
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      {globalData.footerContactPhone}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
