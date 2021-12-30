export interface CreateCustomerBody {
  name: string;
  email: string;
}

export interface CreateCustomerResponse {
  name: string;
  email: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  [k: string]: any;
}
