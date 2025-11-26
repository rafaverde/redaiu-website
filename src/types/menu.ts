import { WPConnection } from ".";

export interface CompanyMenuItem {
  title: string;
  slug: string;
  categoriasEmpresa: {
    nodes: {
      name: string;
    }[];
  };
}

export interface CompanyMenuResponse {
  empresas: WPConnection<CompanyMenuItem>;
}
