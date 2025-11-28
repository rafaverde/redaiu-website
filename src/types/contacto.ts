import { WPImage } from ".";

export interface ContactoData {
  introText: string;
  institutionalDataTitle: string;
  institutionalDataBody: string;
}

export interface ContactoDataResponse {
  page: {
    title: string;
    featuredImage: WPImage;
    contactoFg: ContactoData;
  };
}
