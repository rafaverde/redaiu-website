import { WPConnection, WPImage } from ".";

export interface Apoiador {
  title: string;
  apoiadoresFg: {
    url: string;
    logo: WPImage;
  };
}

export interface Diferencial {
  title: string;
  diferenciaisFG: {
    description: string;
    iconName: string;
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
