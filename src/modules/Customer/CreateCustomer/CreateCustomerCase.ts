import { OK } from "http-status";
import { injectable } from "inversify";
import CustomerEntity from "../../../infra/db/entities/CustomerEntity";
import WishlistEntity from "../../../infra/db/entities/WishlistEntity";
import {
  createDBConnection,
  getTypeORMConnection,
} from "../../../infra/db/utils/ConnectionHelper";
import { UseCase, UseCaseParams } from "../../../shared/contracts";
import ExceptionHandler from "../../../shared/decorators/ExceptionHandler";
import HttpResponse from "../../../shared/responses/HttpResponse";
import {
  CreateCustomerBody,
  CreateCustomerResponse,
} from "./CreateCustomerInterface";

@injectable()
export default class CreateCustomerCase implements UseCase {
  @ExceptionHandler()
  async execute({ body }: UseCaseParams<CreateCustomerBody>) {
    const { name, email } = body;

    await createDBConnection();

    const result = await this.createCustomerAndWishlist(email, name);

    return HttpResponse.success<CreateCustomerResponse>({
      body: result,
      statusCode: OK,
    });
  }

  private async createCustomerAndWishlist(email: string, name: string) {
    const ormRepository = getTypeORMConnection().getRepository(CustomerEntity);
    const wishlistRepository =
      getTypeORMConnection().getRepository(WishlistEntity);

    const customer = await ormRepository.save({
      email,
      name,
    });

    const wishlist = await wishlistRepository.save({
      customer,
    });

    await ormRepository.update(customer.id, {
      wishlist,
      name,
    });
    return customer;

    // const result = await ormRepository.findOne({ id: customer.id });
    // return result;
  }
}
