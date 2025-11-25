import { WPConnection, WPImage } from ".";

export interface Apoiador {
  title: string;
  apoiadoresFg: {
    url: string;
    logotipo: WPImage;
  };
}

export interface Diferencial {
  title: string;
  diferenciaisFg: {
    description: string;
    iconName: string[] | string;
  };
}

export interface GlobalData {
  footerDescription: string;
  footerContactEmail: string;
  footerContactPhone: string;
  footerSupportLogos: WPConnection<Apoiador>;
  whyUruguayTitle: string;
  whyUruguayCards: WPConnection<Diferencial>;
}

export interface GlobalDataResponse {
  page: {
    title: string;
    globalFg: GlobalData;
  };
}
