import { WPConnection, WPImage } from ".";

export interface CompanySummary {
  title: string;
  slug: string;
  empresasFg: {
    logo: WPImage;
    logoNegativo: WPImage;
  };
}

export interface HomeData {
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroImage1: WPImage;
  heroImage2: WPImage;
  heroImage3: WPImage;
  heroImage4: WPImage;
  heroImage5: WPImage;
  heroImage6: WPImage;

  // Why Red Aiu Section
  whyAiuTitle: string;
  whyAiuBody: string;
  whyAiuAreas: string;

  // Company Grid
  companyGridTitle: string;
}

export interface HomeDataResponse {
  page: {
    homeFg: HomeData;
  };
  empresas: WPConnection<CompanySummary>;
}
