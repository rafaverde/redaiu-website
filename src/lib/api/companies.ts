import { gql } from "@apollo/client";
import { getClient } from "../apollo";
import {
  CompanyDataResponse,
  CompanySlugsResponse,
} from "@/src/types/companies";

const GET_COMPANY_BY_SLUG = gql`
  query GetCompanyBySlug($slug: ID!) {
    empresa(id: $slug, idType: SLUG) {
      title
      slug
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
      empresasFg {
        subtitle
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
        websiteUrl
        linkedinUrl
        whatsappPhone
        contactName
        contactTitle
        contactEmail
        contactPhone
        contactLinkedin
        areasExpertise
        services
        markets
        proyectosRelacionados {
          nodes {
            ... on Proyecto {
              title
              content(format: RENDERED)
              proyectosFg {
                year
                country
                measurementValue
                unitOfMeasurement
                client
                scope
              }
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
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_COMPANIES_SLUG = gql`
  query GetAllCompanySlugs {
    empresas(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export async function getCompanyBySlug(slug: string) {
  const client = getClient();

  try {
    const { data } = await client.query<CompanyDataResponse>({
      query: GET_COMPANY_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache",
    });

    return data?.empresa;
  } catch (err) {
    console.error(`Erro ao buscar empresa ${slug}: `, err);
    return null;
  }
}

export async function getAllCompaniesSlug() {
  const client = getClient();

  try {
    const { data } = await client.query<CompanySlugsResponse>({
      query: GET_ALL_COMPANIES_SLUG,
      fetchPolicy: "no-cache",
    });

    return data?.empresas.nodes;
  } catch (err) {
    console.error(`Erro ao buscar slugs das empresas`, err);
    return [];
  }
}
