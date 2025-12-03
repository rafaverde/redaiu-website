import { gql } from "@apollo/client";
import { getClient } from "../apollo";
import { CompanyMenuResponse } from "@/src/types/menu";

export const GET_MENU_COMPANIES = gql`
  query GetMenuCompanies {
    empresas(first: 100, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        title
        slug
        categoriasEmpresa {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export async function getMenuCompanies() {
  const client = getClient();

  try {
    const { data } = await client.query<CompanyMenuResponse>({
      query: GET_MENU_COMPANIES,
      fetchPolicy: "network-only",
      context: {
        fetchOption: {
          next: { revalidate: 60 },
        },
      },
    });

    return data?.empresas.nodes || [];
  } catch (err) {
    console.error("Erro ao buscar empresas do menu:", err);
    return [];
  }
}
