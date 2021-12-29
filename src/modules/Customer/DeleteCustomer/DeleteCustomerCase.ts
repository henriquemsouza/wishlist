import { OK } from "http-status";
import { injectable } from "inversify";
import CustomerEntity from "../../../infra/db/entities/CustomerEntity";
import WishlistEntity from "../../../infra/db/entities/WishlistEntity";
import {
  createDBConnection,
  getTypeORMConnection,
} from "../../../infra/db/utils/ConnectionHelper";

import { GenericUseCase } from "../../../shared/contracts";
import ExceptionHandler from "../../../shared/decorators/ExceptionHandler";
import GenericException from "../../../shared/exceptions/GenericException";
import HttpResponse from "../../../shared/responses/HttpResponse";
import { DeleteCustomerResponse } from "./DeleteCustomerInterface";

@injectable()
export default class DeleteCustomerCase implements GenericUseCase {
  @ExceptionHandler()
  async execute(id: string) {
    try {
      await createDBConnection();

      const result = await this.deleteCustomer(id);

      return HttpResponse.success<DeleteCustomerResponse>({
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

  private async deleteCustomer(id: string) {
    const ormRepository = getTypeORMConnection().getRepository(CustomerEntity);

    const wishRepository = getTypeORMConnection().getRepository(WishlistEntity);

    const customer = await ormRepository.findOne({
      where: {
        id,
      },
      relations: ["wishlist"],
    });

    if (!customer) {
      throw new Error("No Customer were found");
    }

    if (customer.wishlist) {
      wishRepository.delete(customer.wishlist.id);
    }

    const result = await ormRepository.delete(id);
    return result;
  }
}
