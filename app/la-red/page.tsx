import SectionSeparator from "@/src/components/layout/SectionSeparator";
import { getGlobalData } from "@/src/lib/api/global";
import { getLaRedData } from "@/src/lib/api/la-red";

import Image from "next/image";
import { notFound } from "next/navigation";

import { IconType } from "react-icons";
import {
  LuRocket,
  LuWaypoints,
  LuEarth,
  LuSparkles,
  LuExpand,
} from "react-icons/lu";

const iconMap: { [key: string]: IconType } = {
  LuEarth,
  LuSparkles,
  LuExpand,
};

export const revalidate = 60;

export default async function LaRed() {
  const [pageData, globalData] = await Promise.all([
    getLaRedData(),
    getGlobalData(),
  ]);

  if (!pageData) return notFound();

  const { title, featuredImage, laredFg } = pageData;
  const objetivosList = [
    {
      icon: laredFg.objetivo1Icon,
      title: laredFg.objetivo1Titulo,
      description: laredFg.objetivo1Descripcion,
    },
    {
      icon: laredFg.objetivo2Icon,
      title: laredFg.objetivo2Titulo,
      description: laredFg.objetivo2Descripcion,
    },
    {
      icon: laredFg.objetivo3Icon,
      title: laredFg.objetivo3Titulo,
      description: laredFg.objetivo3Descripcion,
    },
  ].filter((objetivo) => objetivo.title); // Filtra caso algum não esteja preenchido.

  return (
    <>
      <section className="text-redaiu-gray-800 flex h-[calc(100vh-100px)] w-full items-center">
        <div className="fixed -z-100 h-full w-full">
          {featuredImage?.node?.sourceUrl && (
            <Image
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText || ""}
              fill
              className="bg-redaiu-gray-700 absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="border-redaiu-blue-300 border-l-4 pl-6 text-4xl font-bold tracking-widest text-white uppercase drop-shadow-lg md:text-6xl">
            {title}
          </h2>
        </div>
      </section>

      {/* Seção Missão/Propósito */}
      <section className="bg-redaiu-gray-100/90">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-15 pt-24 md:grid-cols-2 md:px-1 lg:gap-16">
          {/* Card Missão */}
          <div className="border-redaiu-blue-700 flex flex-col items-center rounded-2xl border-t-4 bg-white p-8 pt-0 shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-redaiu-blue-700 -mt-12 mb-6 flex size-24 items-center justify-center rounded-full p-6">
              <LuRocket className="size-full text-white" />
            </div>
            <h2 className="text-redaiu-blue-700 mb-6 text-2xl font-bold tracking-widest uppercase">
              {laredFg.misionTitle}
            </h2>
            <div
              className="prose text-center leading-relaxed text-gray-600"
              dangerouslySetInnerHTML={{ __html: laredFg.misionBody }}
            />
          </div>

          {/* Card Propósito */}
          <div className="border-redaiu-blue-500 flex flex-col items-center rounded-2xl border-t-4 bg-white p-8 pt-0 shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-redaiu-blue-500 -mt-12 mb-6 flex size-24 items-center justify-center rounded-full p-6">
              <LuWaypoints className="size-full text-white" />
            </div>
            <h2 className="text-redaiu-blue-700 mb-6 text-2xl font-bold tracking-widest uppercase">
              {laredFg.propositoTitle}
            </h2>
            <div
              className="prose text-center leading-relaxed text-gray-600"
              dangerouslySetInnerHTML={{ __html: laredFg.propositoBody }}
            />
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* Seção Objetivos */}
      <section className="bg-redaiu-blue-500/85 px-4 py-15">
        <div className="container mx-auto">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-widest text-white uppercase">
            {laredFg.objetivosTitle}
          </h2>

          <div
            className="prose prose-lg bg-redaiu-blue-50/50 mx-auto flex items-center justify-center rounded-2xl text-center leading-relaxed text-gray-100 [&_h3]:max-w-3xl [&_h3]:text-xl"
            dangerouslySetInnerHTML={{ __html: laredFg.objetivosBody }}
          />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {objetivosList.map((objetivo, index) => {
              const IconComponent = iconMap[objetivo.icon[0]] || LuEarth;

              return (
                <div
                  key={index}
                  className="bg-redaiu-blue-300/20 space-y-4 rounded-tr-4xl rounded-bl-4xl border-l-4 p-6"
                >
                  <IconComponent size={36} className="text-redaiu-blue-200" />
                  <div className="space-y-2 text-white">
                    <h4 className="text-2xl font-bold">{objetivo.title}</h4>
                    <p className="leading-relaxed">{objetivo.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seção Apoios */}
      <section className="bg-redaiu-gray-800 py-15 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-redaiu-blue-300 mb-8 text-3xl font-bold uppercase">
            {laredFg.apoyosTitle}
          </h2>

          <div
            className="prose prose-invert prose-lg mx-auto mb-16 max-w-3xl leading-relaxed text-gray-300"
            dangerouslySetInnerHTML={{ __html: laredFg.apoyosBody }}
          />

          {/* Logos dos Apoiadores (Reutilizados do GlobalData) */}
          {globalData?.footerSupportLogos?.nodes && (
            <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
              {globalData.footerSupportLogos.nodes.map((apoiador, index) => (
                <div
                  key={index}
                  className="relative h-16 w-32 opacity-80 transition-opacity duration-300 hover:opacity-100 lg:h-20 lg:w-40"
                >
                  {apoiador.apoiadoresFg.logotipo?.node?.sourceUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={apoiador.apoiadoresFg.logotipo.node.sourceUrl}
                      alt={apoiador.title || "Logo de apoio"}
                      className="h-full w-full object-contain object-center brightness-0 invert"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
