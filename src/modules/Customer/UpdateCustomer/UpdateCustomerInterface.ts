export interface UpdateCustomerBody {
  name: string;
  email: string;
  id: string;
}

export interface UpdateCustomerResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
