import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CompanyMenuItem } from "../types/menu";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Embaralha um array usando o algoritmo Fisher-Yates.
 * Retorna uma cópia do array, mantendo a imutabilidade.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * Agrupa as empresas para o submenu categorizado,
 * retornando os nomes das categorias e as empresas
 * em cada uma delas.
 */
export type GroupedCompanies = Record<string, CompanyMenuItem[]>;

export function groupCompaniesByCategory(
  companies: CompanyMenuItem[],
): GroupedCompanies {
  const groups: GroupedCompanies = {};

  companies.forEach((company) => {
    // Verifica se a empresa tem categoria
    const categories = company.categoriasEmpresa?.nodes || [];

    categories.forEach((category) => {
      const categoryName = category.name;

      // Se a categoria ainda não existe no objeto, cria um array vazio
      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }

      // Adiciona a empresa à categoria
      // (Evita duplicatas se a query trouxer algo estranho, embora o WP garanta unicidade geralmente)
      if (!groups[categoryName].some((c) => c.slug === company.slug)) {
        groups[categoryName].push(company);
      }
    });
  });

  // Ordena as categorias alfabeticamente
  const sortedGroups: GroupedCompanies = {};
  Object.keys(groups)
    .sort()
    .forEach((key) => {
      sortedGroups[key] = groups[key];
    });

  return sortedGroups;
}

/**
 * Converte textarea que chega do WP com itens por linha
 * em um array de tópicos.
 */
export const toList = (text: string) =>
  text ? text.split("\n").filter((line) => line.trim()) : [];
