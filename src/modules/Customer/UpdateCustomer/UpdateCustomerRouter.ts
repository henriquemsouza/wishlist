import { inject, injectable } from "inversify";
import { IHttpRequest, RequestRouter } from "../../../shared/contracts";
import UpdateCustomerCase from "./UpdateCustomerCase";
import { UpdateCustomerBody } from "./interface/UpdateCustomerInterface";

@injectable()
export default class UpdateCustomerRouter implements RequestRouter {
  @inject(UpdateCustomerCase) private case: UpdateCustomerCase;

  async route(req: IHttpRequest<UpdateCustomerBody, any, any, any>) {
    const result = await this.case.execute({
      body: req.body,
    });
    return result;
  }
}
