import { CompanySummary } from "@/src/types/home";
import Image from "next/image";
import Link from "next/link";

interface CompanyGridProps {
  title?: string;
  companies?: CompanySummary[];
}

export default function CompanyGrid({ title, companies }: CompanyGridProps) {
  return (
    <section className="bg-redaiu-blue-700 py-15">
      <div className="container mx-auto space-y-9 px-4 text-white md:px-0">
        <h2 className="text-redaiu-blue-300 mx-auto max-w-[60%] text-center text-3xl leading-tight font-extralight md:text-5xl">
          {title}
        </h2>

        <div className="flex w-full flex-wrap items-center justify-center">
          {companies?.map((company, index) => (
            <div
              key={index + company.slug}
              className="flex w-full items-center justify-center md:w-1/4"
            >
              <Link
                href={`/empresas/${company.slug}`}
                className="group cursor-pointer"
              >
                <Image
                  src={company.empresasFg.logoNegativo.node.sourceUrl}
                  alt={company.empresasFg.logoNegativo.node.altText}
                  width={
                    company.empresasFg.logoNegativo.node.mediaDetails?.width
                  }
                  height={
                    company.empresasFg.logoNegativo.node.mediaDetails?.height
                  }
                  className="h-auto max-w-[300px] transition-opacity duration-500 ease-in-out group-hover:opacity-70"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
