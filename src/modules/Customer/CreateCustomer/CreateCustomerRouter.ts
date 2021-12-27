import { inject, injectable } from "inversify";
import { IHttpRequest, RequestRouter } from "../../../shared/contracts";
import CreateCustomerCase from "./CreateCustomerCase";
import { CreateCustomerBody } from "./CreateCustomerInterface";

@injectable()
export default class CreateCustomerRouter implements RequestRouter {
  @inject(CreateCustomerCase) private case: CreateCustomerCase;

  async route(req: IHttpRequest<CreateCustomerBody, any, any, any>) {
    const result = await this.case.execute({
      body: req.body,
    });
    return result;
  }
}
