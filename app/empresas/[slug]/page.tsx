import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

import { FaLinkedin } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import Link from "next/link";
import { ChevronRight, Mail, PhoneCall } from "lucide-react";
import { getAllCompaniesSlug, getCompanyBySlug } from "@/src/lib/api/companies";
import { notFound } from "next/navigation";
import { formatNumber, toList } from "@/src/lib/utils";

export async function generateStaticParams() {
  const companies = await getAllCompaniesSlug();
  return companies?.map((company) => ({ slug: company.slug }));
}

export const revalidate = 60;

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const company = await getCompanyBySlug(slug);

  if (!company) {
    return notFound();
  }

  const { title, content, featuredImage, empresasFg } = company;

  return (
    <>
      <section className="text-redaiu-gray-600 bg-white">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-15 md:px-1 lg:grid-cols-2">
          <div className="mb-8 flex flex-col gap-4 md:mb-0">
            <div className="py-4">
              <h2 className="sr-only">{title}</h2>
              <Image
                src={empresasFg?.logo?.node?.sourceUrl}
                alt={empresasFg?.logo?.node?.altText}
                width={300}
                height={0}
              />
            </div>

            <div className="border-redaiu-blue-300 flex items-center justify-between border-y py-4">
              <Link href={empresasFg?.websiteUrl}>
                <div className="hover:text-redaiu-blue-300 flex items-center gap-2">
                  <LuLink size={28} /> {empresasFg?.websiteUrl}
                </div>
              </Link>
              <Link href={empresasFg?.linkedinUrl} target="_blank">
                <FaLinkedin
                  size={50}
                  className="text-redaiu-gray-800 hover:text-redaiu-blue-300"
                />
              </Link>
            </div>

            <div className="space-y-4 py-4">
              <h3 className="text-redaiu-blue-300 text-2xl font-bold uppercase">
                Sobre Nosotros
              </h3>

              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-10">
            <Image
              src={featuredImage?.node?.sourceUrl}
              alt={featuredImage?.node?.altText}
              width={featuredImage?.node?.mediaDetails?.width}
              height={featuredImage?.node?.mediaDetails?.height}
            />
            <div>
              <Link
                href={`https://wa.me/${empresasFg.whatsappPhone}`}
                target="_blank"
              >
                <Button
                  size="lg"
                  className="bg-redaiu-blue-300 hover:bg-redaiu-blue-700 cursor-pointer"
                >
                  Contactar <FaWhatsapp />{" "}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="from-redaiu-gray-800 to-redaiu-gray-500 bg-linear-to-r from-50% to-50%">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3">
          <div className="bg-redaiu-gray-800 space-y-4 px-8 py-15">
            <h2 className="text-xl font-bold uppercase md:text-2xl">
              Areas de expertise
            </h2>
            <ul className="leading-relaxed">
              {toList(empresasFg.areasExpertise).map((item, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="size-4" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-redaiu-gray-600 space-y-4 px-8 py-15">
            <h2 className="text-xl font-bold uppercase md:text-2xl">
              Servicios
            </h2>
            <ul className="leading-relaxed">
              {toList(empresasFg.services).map((item, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="size-4" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-redaiu-gray-500 space-y-4 px-8 py-15">
            <h2 className="text-xl font-bold uppercase md:text-2xl">
              Mercados en los que ha trabajado
            </h2>
            <ul className="leading-relaxed">
              {toList(empresasFg.markets).map((item, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className="size-4" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-redaiu-blue-200 text-redaiu-gray-800">
        <div className="container mx-auto px-4 py-15 md:px-1">
          <div className="border-redaiu-blue-300 border-b pb-9">
            <h2 className="text-3xl text-white uppercase md:text-5xl">
              Proyectos Emblemáticos
            </h2>
          </div>

          {empresasFg.proyectosRelacionados.nodes.map((project, index) => (
            <article
              key={index + project.title}
              className="border-redaiu-blue-300 grid grid-cols-1 gap-12 border-b py-9 lg:grid-cols-2"
            >
              <div className="flex justify-end">
                <Image
                  src={project?.featuredImage?.node?.sourceUrl}
                  alt={project?.featuredImage?.node?.altText}
                  width={project?.featuredImage?.node?.mediaDetails?.width}
                  height={project?.featuredImage?.node?.mediaDetails?.height}
                  className="rounded-4xl"
                />
              </div>
              <div className="flex flex-col justify-center gap-9">
                <div>
                  <h3 className="text-xl font-bold uppercase md:text-2xl">
                    {project.title}
                  </h3>
                  <div>
                    {project.proyectosFg.squareMeters && (
                      <span className="border-redaiu-gray-800 border-r px-2 first:pl-0 last:border-0">
                        {formatNumber(project.proyectosFg.squareMeters)}m
                        <sup>2</sup>
                      </span>
                    )}
                    {project.proyectosFg.year && (
                      <span className="border-redaiu-gray-800 border-r px-2 first:pl-0 last:border-0">
                        {project.proyectosFg.year}
                      </span>
                    )}
                    {project.proyectosFg.country && (
                      <span className="border-redaiu-gray-800 border-r px-2 first:pl-0 last:border-0">
                        {project.proyectosFg.country}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: project.content }}
                ></div>
                <p>
                  <strong>Cliente: </strong> {project?.proyectosFg?.client}
                </p>
                <p>
                  <strong>Alcance: </strong> {project?.proyectosFg?.scope}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-redaiu-gray-800 text-white">
        <div className="container mx-auto grid grid-cols-1 px-4 py-15 md:grid-cols-3 md:px-1">
          <div className="border-redaiu-blue-300 flex flex-col justify-center border-b p-6 md:border-r md:border-b-0">
            <h2 className="text-2xl md:text-4xl">Contacto</h2>
          </div>
          <div className="border-redaiu-blue-300 flex flex-col justify-center border-b p-6 md:border-r md:border-b-0">
            <div>
              <Link
                href={empresasFg?.contactLinkedin}
                target="_blank"
                className="hover:text-redaiu-blue-300 flex gap-4"
              >
                <FaLinkedin size={36} />

                <div>
                  <p className="font-bold italic">{empresasFg?.contactName}</p>
                  <p className="italic">{empresasFg?.contactTitle}</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-6">
            <Link
              href={`mailto:${empresasFg.contactEmail}`}
              target="_blank"
              className="hover:text-redaiu-blue-300 flex items-center gap-3"
            >
              <Mail size={24} />
              {empresasFg.contactEmail}
            </Link>

            <Link
              href={`tel:${empresasFg.contactPhone}`}
              target="_blank"
              className="hover:text-redaiu-blue-300 flex items-center gap-3"
            >
              <PhoneCall size={24} />
              {empresasFg.contactPhone}
            </Link>

            <Link
              href={`https://wa.me/${empresasFg.whatsappPhone}`}
              target="_blank"
              className="hover:text-redaiu-blue-300 flex items-center gap-3"
            >
              <FaWhatsapp size={24} />
              {empresasFg.whatsappPhone}
            </Link>

            <Link
              href={empresasFg.linkedinUrl}
              target="_blank"
              className="hover:text-redaiu-blue-300 flex items-center gap-3"
            >
              <FaLinkedin size={24} />
              {company.title}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
