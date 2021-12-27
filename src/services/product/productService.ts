import { inject, injectable } from "inversify";
import env from "../../infra/config/env";
import AxiosHttpHandle from "../../infra/http/AxiosHttpHandler";
import {
  ProductListResponse,
  ProductResponse,
} from "./productServiceInterface";

@injectable()
export default class ProductService {
  @inject(AxiosHttpHandle) private http: AxiosHttpHandle;

  async find(id: string): Promise<ProductResponse> {
    const url = `${env.product_api}/api/product/${id}/`;

    const { data } = await this.http.get<ProductResponse>(url);
    return data;
  }

  async findAll(page = 0): Promise<ProductListResponse> {
    const url = `${env.product_api}/api/product/`;

    const { data } = await this.http.get<ProductListResponse>(url, {
      params: {
        page,
      },
    });
    return data;
  }
}
