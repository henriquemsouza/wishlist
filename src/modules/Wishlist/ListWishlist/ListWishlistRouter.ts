import { inject, injectable } from "inversify";
import { IHttpRequest, RequestRouter } from "../../../shared/contracts";

import ListWishlistCase from "./ListWishlistCase";
import { ListWishlistQuery } from "./interface/ListWishlistInterface";

@injectable()
export default class ListWishlistRouter implements RequestRouter {
  @inject(ListWishlistCase) private case: ListWishlistCase;

  async route(req: IHttpRequest<any, ListWishlistQuery, any, any>) {
    const customer_id = req.query?.customer_id;
    const result = await this.case.execute(customer_id);
    return result;
  }
}
