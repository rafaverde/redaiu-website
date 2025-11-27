import { gql } from "@apollo/client";
import { getClient } from "../apollo";
import { ContactoDataResponse } from "@/src/types/contacto";

export const GET_CONTACTO_DATA = gql`
  query GetContactoData {
    page(id: "contacto", idType: URI) {
      title
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
      contactoFg {
        introText
        institutionalDataTitle
        institutionalDataBody
      }
    }
  }
`;

export async function getContactoData() {
  const client = getClient();

  try {
    const { data } = await client.query<ContactoDataResponse>({
      query: GET_CONTACTO_DATA,
      fetchPolicy: "no-cache",
    });

    return data?.page;
  } catch (err) {
    console.log("Erro ao buscar dados da página Contacto: ", err);
    return null;
  }
}
