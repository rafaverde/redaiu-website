import { WPImage } from ".";

export interface LaRedData {
  misionTitle: string;
  misionBody: string;
  propositoTitle: string;
  propositoBody: string;

  objetivosTitle: string;
  objetivosBody: string;
  // Card1
  objetivo1Descripcion: string;
  objetivo1Icon: string;
  objetivo1Titulo: string;
  // Card2
  objetivo2Descripcion: string;
  objetivo2Icon: string;
  objetivo2Titulo: string;
  // Card3
  objetivo3Descripcion: string;
  objetivo3Icon: string;
  objetivo3Titulo: string;

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
