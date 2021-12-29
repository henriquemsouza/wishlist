export interface ListWishlistQuery {
  customer_id: string;
}

export interface ListWishlistResponse {
  id: number;
  customer_id: number;
  items: Item[];
}

export interface Item {
  title: string;
  price: number;
  image: string;
  product_id: string;
}
