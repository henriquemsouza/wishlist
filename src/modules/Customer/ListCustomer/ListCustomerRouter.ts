import { inject, injectable } from "inversify";
import { IHttpRequest, RequestRouter } from "../../../shared/contracts";

import ListCustomerCase from "./ListCustomerCase";
import { ListCustomerQuery } from "./ListInterface";

@injectable()
export default class ListCustomerRouter implements RequestRouter {
  @inject(ListCustomerCase) private case: ListCustomerCase;

  async route(req: IHttpRequest<any, ListCustomerQuery, any,any>) {
    const id = req.query?.id;
    const result = await this.case.execute(id);
    return result;
  }
}
