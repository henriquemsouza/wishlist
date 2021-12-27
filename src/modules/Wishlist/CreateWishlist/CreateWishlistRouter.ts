import { inject, injectable } from "inversify";
import { RequestRouter } from "../../../shared/contracts";
import CreateWishlistCase from "./CreateWishlistCase";

@injectable()
export default class CreateWishlistRouter implements RequestRouter {
  @inject(CreateWishlistCase) private case: CreateWishlistCase;

  async route() {
    const result = await this.case.execute();
    return result;
  }
}
