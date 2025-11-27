import { gql } from "@apollo/client";
import { getClient } from "../apollo";
import { LaRedDataResponse } from "@/src/types/la-red";

export const GET_LA_RED_DATA = gql`
  query GetLaRedData {
    page(id: "la-red", idType: URI) {
      title
      content(format: RENDERED)
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      laredFg {
        misionTitle
        misionBody
        propositoTitle
        propositoBody
        objetivosTitle
        objetivosBody
        apoyosTitle
        apoyosBody
      }
    }
  }
`;

export async function getLaRedData() {
  const client = getClient();

  try {
    const { data } = await client.query<LaRedDataResponse>({
      query: GET_LA_RED_DATA,
      fetchPolicy: "no-cache",
    });

    return data?.page;
  } catch (err) {
    console.error("Erro ao buscar dados da página La Red: ", err);
    return null;
  }
}
