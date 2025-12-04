import { Metadata } from "next";
import { CompanyData } from "../types/companies";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function generateCompanyMetadata(company: CompanyData | null): Metadata {
  if (!company) {
    return {
      title: "Empresa no encontrada",
      description: "Esta empresa ha sido eliminado o no existe.",
    };
  }

  const imageUrl = company.featuredImage?.node?.sourceUrl;

  return {
    title: company.title,
    description: company.content,
    openGraph: {
      title: company.title,
      description: company.content,
      url: `${siteUrl}/empresas/${company.slug}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}
