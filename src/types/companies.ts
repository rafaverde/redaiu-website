import { WPConnection, WPImage } from ".";

export interface RelatedProject {
  title: string;
  content: string;
  proyectosFg: {
    year: number;
    country: string;
    squareMeters: number;
    client: string;
    scope: string;
  };
  featuredImage: WPImage;
}

export interface CompanyData {
  title: string;
  slug: string;
  content: string;
  featuredImage: WPImage;

  empresasFg: {
    subtitle: string;
    logo: WPImage;
    websiteUrl: string;
    linkedinUrl: string;
    whatsappPhone: string;
    contactName: string;
    contactTitle: string;
    contactEmail: string;
    contactPhone: string;
    contactLinkedin: string;

    areasExpertise: string;
    services: string;
    markets: string;

    proyectosRelacionados: WPConnection<RelatedProject>;
  };
}

export interface CompanyDataResponse {
  empresa: CompanyData;
}

export interface CompanySlugsResponse {
  empresas: {
    nodes: {
      slug: string;
    }[];
  };
}
