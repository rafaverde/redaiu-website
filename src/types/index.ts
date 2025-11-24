// Tipo genérico para imagens que vêm do WP
export interface WPImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails?: {
      width?: number;
      height?: number;
    };
  };
}

// Tipo genérico para relacionamentos do WPGrahQL (que usem nodes)
export interface WPConnection<T> {
  nodes: T[];
}
