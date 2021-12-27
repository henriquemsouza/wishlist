export interface ProductResponse {
  price: number;
  image: string;
  brand: string;
  id: string;
  title: string;
}

export interface Meta {
  page_number: number;
  page_size: number;
}

export interface Product {
  price: number;
  image: string;
  brand: string;
  id: string;
  title: string;
  reviewScore?: number;
}

export interface ProductListResponse {
  meta: Meta;
  products: Product[];
}
