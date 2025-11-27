import { WPImage } from ".";

export interface LaRedData {
  misionTitle: string;
  misionBody: string;
  propositoTitle: string;
  propositoBody: string;
  objetivosTitle: string;
  objetivosBody: string;
  apoyosTitle: string;
  apoyosBody: string;
}

export interface LaRedDataResponse {
  page: {
    title: string;
    content: string;
    featuredImage: WPImage;
    laredFg: LaRedData;
  };
}
