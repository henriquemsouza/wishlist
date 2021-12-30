import { OK } from "http-status";
import { injectable } from "inversify";

import WishlistItemEntity from "../../../infra/db/entities/WishlistItemEntity";
import {
  createDBConnection,
  getTypeORMConnection,
} from "../../../infra/db/utils/ConnectionHelper";

import { GenericUseCase } from "../../../shared/contracts";
import ExceptionHandler from "../../../shared/decorators/ExceptionHandler";
import GenericException from "../../../shared/exceptions/GenericException";
import HttpResponse from "../../../shared/responses/HttpResponse";
import { DeleteWishlistItemResponse } from "./DeleteWishlistItemInterface";

@injectable()
export default class DeleteWishlistItemCase implements GenericUseCase {
  @ExceptionHandler()
  async execute(id: string) {
    try {
      await createDBConnection();

      const result = await this.deleteWishlistItem(id);

      return HttpResponse.success<DeleteWishlistItemResponse>({
        body: result,
        statusCode: OK,
      });
    } catch (error) {
      return HttpResponse.error(
        new GenericException({
          name: "BadRequest",
          statusCode: 500,
          message: error,
        })
      );
    }
  }

  private async deleteWishlistItem(id: string) {
    if (!id) {
      throw new Error("id cannot be blank");
    }

    const ormRepository =
      getTypeORMConnection().getRepository(WishlistItemEntity);

    const result = await ormRepository.delete(id);
    return result;
  }
}
