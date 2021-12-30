import { inject, injectable } from "inversify";
import { IHttpRequest, RequestRouter } from "../../../shared/contracts";

import DeleteWishlistItemCase from "./DeleteWishlistItemCase";
import { DeleteWishlistItemQuery } from "./interface/DeleteWishlistItemInterface";

@injectable()
export default class DeleteWishlistItemRouter implements RequestRouter {
  @inject(DeleteWishlistItemCase) private case: DeleteWishlistItemCase;

  async route(req: IHttpRequest<any, DeleteWishlistItemQuery, any, any>) {
    const id = req.query?.id;
    const result = await this.case.execute(id);
    return result;
  }
}
