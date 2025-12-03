import { gql } from "@apollo/client";
import { getClient } from "../apollo";
import { GlobalDataResponse } from "@/src/types/global";

const GET_GLOBAL_DATA = gql`
  query GetGlobalData {
    page(id: "configuracion-global", idType: URI) {
      title
      globalFg {
        footerDescription
        footerContactEmail
        footerContactPhone
        footerSupportLogos {
          nodes {
            ... on Apoiador {
              title
              apoiadoresFg {
                url
                logotipo {
                  node {
                    altText
                    sourceUrl
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        whyUruguayTitle
        whyUruguayCards {
          nodes {
            ... on Diferencial {
              title
              diferenciaisFg {
                description
                iconName
              }
            }
          }
        }
      }
    }
  }
`;

export async function getGlobalData() {
  const client = getClient();

  try {
    const { data } = await client.query<GlobalDataResponse>({
      query: GET_GLOBAL_DATA,
      fetchPolicy: "no-cache",
    });

    return data?.page?.globalFg || null;
  } catch (err) {
    console.error("Erro ao buscar dados globais: ", err);
    throw new Error("Falha ao conectar com o WordPress");
  }
}
