import { OK } from "http-status";
import { injectable } from "inversify";
import CustomerEntity from "../../../infra/db/entities/CustomerEntity";
import WishlistEntity from "../../../infra/db/entities/WishlistEntity";
import {
  createDBConnection,
  getTypeORMConnection,
} from "../../../infra/db/utils/ConnectionHelper";
import Customer from "../../../infra/db/validations/Customer";
import StructureError from "../../../infra/db/validations/errors/structureError/StructureError";
import { buildErrorsMessage } from "../../../infra/db/validations/errors/utils";
import ObjectValidator from "../../../infra/db/validations/ObjectValidator";
import { UseCase, UseCaseParams } from "../../../shared/contracts";
import ExceptionHandler from "../../../shared/decorators/ExceptionHandler";
import GenericException from "../../../shared/exceptions/GenericException";
import HttpResponse from "../../../shared/responses/HttpResponse";
import {
  CreateCustomerBody,
  CreateCustomerResponse,
} from "./interface/CreateCustomerInterface";

@injectable()
export default class CreateCustomerCase implements UseCase {
  @ExceptionHandler()
  async execute({ body }: UseCaseParams<CreateCustomerBody>) {
    try {
      const customer = new Customer(body);
      await new ObjectValidator().run(customer);

      await createDBConnection();

      const result = await this.createCustomerAndWishlist(customer);

      return HttpResponse.success<CreateCustomerResponse>({
        body: result,
        statusCode: OK,
      });
    } catch (error) {
      if (error instanceof StructureError) {
        const errors = buildErrorsMessage(error.details).join(", ");

        return HttpResponse.error(
          new GenericException({
            name: "BadRequest",
            statusCode: 500,
            message: errors,
          })
        );
      }

      return HttpResponse.error(
        new GenericException({
          name: "BadRequest",
          statusCode: 500,
          message: error,
        })
      );
    }
  }

  private async createCustomerAndWishlist(customerInfo: Customer) {
    const ormRepository = getTypeORMConnection().getRepository(CustomerEntity);
    const wishlistRepository =
      getTypeORMConnection().getRepository(WishlistEntity);

    const customer = await ormRepository.save(customerInfo);

    const wishlist = await wishlistRepository.save({
      customer,
    });

    await ormRepository.update(customer.id, {
      wishlist,
    });
    return customer;
  }
}
