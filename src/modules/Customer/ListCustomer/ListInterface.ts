export interface ListCustomerQuery {
  id: string;
}

export interface ListCustomerResponse {
  customers: Customer[];
}

export interface Wishlist {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  wishlist: Wishlist;
}
