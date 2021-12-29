import { inject, injectable } from "inversify";
import { IHttpRequest, RequestRouter } from "../../../shared/contracts";

import CreateWishlistItemCase from "./CreateWishlistItemCase";
import { CreateWishlistItemBody } from "./CreateWishlistItemInterface";

@injectable()
export default class CreateWishlistItemRouter implements RequestRouter {
  @inject(CreateWishlistItemCase) private case: CreateWishlistItemCase;

  async route(req: IHttpRequest<CreateWishlistItemBody, any, any, any>) {
    const result = await this.case.execute({
      body: req.body,
    });
    return result;
  }
}
