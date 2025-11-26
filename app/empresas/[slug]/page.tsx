// Importações temporárias
import featuredImage from "@/public/ingenium-header-image.webp";
import companyLogo from "@/public/logo-ingenium-positivo.svg";
import tempBuilding1 from "@/public/projects/project-ponte-igualada.webp";
import tempBuilding2 from "@/public/projects/project-ecipsa.webp";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

import { FaLinkedin } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import Link from "next/link";

export default function CompanyPage() {
  return (
    <>
      <section className="text-redaiu-gray-600 bg-white">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-15 md:px-1 lg:grid-cols-2">
          <div className="mb-8 flex flex-col gap-4 md:mb-0">
            <div className="py-4">
              <h2 className="sr-only">Company name</h2>
              <Image src={companyLogo} alt="" width={300} />
            </div>

            <div className="border-redaiu-blue-300 flex items-center justify-between border-y py-4">
              <Link href={`/teste`}>
                <div className="hover:text-redaiu-blue-300 flex items-center gap-2">
                  <LuLink size={28} /> www.ingenium.com.uy
                </div>
              </Link>
              <Link href={`https://www.linkedin.com`} className="">
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

              <p>
                Ingenium, desde el 2011, es una consultora en ingeniería
                estructural especializada en el diseño de soluciones ajustadas a
                las singularidades de cada proyecto. Con un fuerte compromiso
                con la sostenibilidad, acciona a través de diseños orientados a
                la optimización de recursos. Diseña estructuras en distintos
                países de Iberoamérica, y sus clientes la eligen por sus valores
                y calidad técnica. Cada proyecto es único; la solución adecuada
                surge de la exploración conjunta con la contraparte, mediante
                una comunicación ﬂuida que permita un entendimiento profundo del
                proyecto y de los intereses de todos los actores involucrados.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-10">
            <Image src={featuredImage} alt="" />
            <div>
              <Button size="lg" className="bg-redaiu-blue-300">
                Contactar <FaWhatsapp />{" "}
              </Button>
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
            <p className="leading-relaxed">
              • Ediﬁcación en altura <br />• Arquitectura comercial e
              institucional <br />• Infraestructura y obra civil <br />•
              Estructuras prefabricadas
            </p>
          </div>
          <div className="bg-redaiu-gray-600 space-y-4 px-8 py-15">
            <h2 className="text-xl font-bold uppercase md:text-2xl">
              Servicios
            </h2>
            <p className="leading-relaxed">
              • Ediﬁcación en altura <br />• Arquitectura comercial e
              institucional <br />• Infraestructura y obra civil <br />•
              Estructuras prefabricadas
            </p>
          </div>
          <div className="bg-redaiu-gray-500 space-y-4 px-8 py-15">
            <h2 className="text-xl font-bold uppercase md:text-2xl">
              Mercados en los que ha trabajado
            </h2>
            <p className="leading-relaxed">
              • Ediﬁcación en altura <br />• Arquitectura comercial e
              institucional <br />• Infraestructura y obra civil <br />•
              Estructuras prefabricadas
            </p>
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

          <div className="border-redaiu-blue-300 grid grid-cols-1 gap-12 border-b py-9 lg:grid-cols-2">
            <div className="flex justify-end">
              <Image src={tempBuilding1} alt="" className="rounded-4xl" />
            </div>
            <div className="flex flex-col justify-center gap-9">
              <div>
                <h3 className="text-xl font-bold uppercase md:text-2xl">
                  Cambuur
                </h3>
                <p>23.000 m2 | 2023 | Países Bajos</p>
              </div>
              <p>
                "Estadio de futbol del club SC Cambuur con capacidad para 15000
                personas. Estructura de hormigón prefabricado con gradas, vigas
                y pilares de hormigón prefabricado , losas alveolares." Proyecto
                ejecutivo de estructura prefabricada de hormigón y acero
              </p>
              <p>
                <strong>Cliente: </strong> Stadium Ontwikkeling Cambuur
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 py-9 lg:grid-cols-2">
            <div className="flex justify-end">
              <Image src={tempBuilding2} alt="" className="rounded-4xl" />
            </div>
            <div className="flex flex-col justify-center gap-9">
              <div>
                <h3 className="text-xl font-bold uppercase md:text-2xl">
                  Cambuur
                </h3>
                <p>23.000 m2 | 2023 | Países Bajos</p>
              </div>
              <p>
                "Estadio de futbol del club SC Cambuur con capacidad para 15000
                personas. Estructura de hormigón prefabricado con gradas, vigas
                y pilares de hormigón prefabricado , losas alveolares." Proyecto
                ejecutivo de estructura prefabricada de hormigón y acero
              </p>
              <p>
                <strong>Cliente: </strong> Stadium Ontwikkeling Cambuur
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
