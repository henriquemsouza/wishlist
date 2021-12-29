import { inject, injectable } from "inversify";
import { IHttpRequest, RequestRouter } from "../../../shared/contracts";
import DeleteCustomerCase from "./DeleteCustomerCase";
import {  DeleteCustomerQuery } from "./DeleteCustomerInterface";



@injectable()
export default class DeleteCustomerRouter implements RequestRouter {
  @inject(DeleteCustomerCase) private case: DeleteCustomerCase;

  async route(req: IHttpRequest<any, DeleteCustomerQuery, any, any>) {
    const id = req.query?.id;
    const result = await this.case.execute(id);
    return result;
  }
}
