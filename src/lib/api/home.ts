import { gql } from "@apollo/client";
import { getClient } from "../apollo";
import { HomeDataResponse } from "@/src/types/home";

export const GET_HOME_DATA = gql`
  query GetHomeData {
    page(id: "home", idType: URI) {
      homeFg {
        heroTitle
        heroSubtitle
        heroImage1 {
          node {
            sourceUrl
            altText
          }
        }
        heroImage2 {
          node {
            altText
            sourceUrl
          }
        }
        heroImage3 {
          node {
            altText
            sourceUrl
          }
        }
        heroImage4 {
          node {
            altText
            sourceUrl
          }
        }
        heroImage5 {
          node {
            altText
            sourceUrl
          }
        }
        heroImage6 {
          node {
            altText
            sourceUrl
          }
        }
        whyAiuTitle
        whyAiuBody
        whyAiuAreas
        companyGridTitle
      }
    }
    empresas(first: 100) {
      nodes {
        title
        slug
        empresasFg {
          logo {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          logoNegativo {
            node {
              sourceUrl
              altText
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
`;

export async function getHomeData() {
  const client = getClient();

  try {
    const { data } = await client.query<HomeDataResponse>({
      query: GET_HOME_DATA,
      fetchPolicy: "no-cache",
    });

    const homeData = data?.page?.homeFg;
    const heroImages = homeData
      ? [
          homeData.heroImage1,
          homeData.heroImage2,
          homeData.heroImage3,
          homeData.heroImage4,
          homeData.heroImage5,
          homeData.heroImage6,
        ].filter((img) => img && img.node)
      : [];

    return {
      pageData: { ...homeData, heroImagesArray: heroImages },
      companies: data?.empresas.nodes || [],
    };
  } catch (err) {
    console.error("Erro ao buscar dados da Home: ", err);
    throw new Error("Falha ao conectar com o WordPress");
  }
}
