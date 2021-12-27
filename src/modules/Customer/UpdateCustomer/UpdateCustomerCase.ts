import { OK } from "http-status";
import { injectable } from "inversify";
import CustomerEntity from "../../../infra/db/entities/CustomerEntity";
import {
  createDBConnection,
  getTypeORMConnection,
} from "../../../infra/db/utils/ConnectionHelper";
import { UseCase, UseCaseParams } from "../../../shared/contracts";
import ExceptionHandler from "../../../shared/decorators/ExceptionHandler";
import HttpResponse from "../../../shared/responses/HttpResponse";

import {
  UpdateCustomerBody,
  UpdateCustomerResponse,
} from "./UpdateCustomerInterface";

@injectable()
export default class UpdateCustomerCase implements UseCase {
  @ExceptionHandler()
  async execute({ body }: UseCaseParams<UpdateCustomerBody>) {
    const { name, email, id } = body;

    await createDBConnection();

    const result = await this.updateCustomer(email, name, id);

    return HttpResponse.success<UpdateCustomerResponse>({
      body: result,
      statusCode: OK,
    });
  }

  private async updateCustomer(
    email: string,
    name: string,
    id: string
  ) {
    const ormRepository = getTypeORMConnection().getRepository(CustomerEntity);

    const customers = await ormRepository.find({
      where: {
        id,
      },
    });

    if (customers.length === 0) {
      throw new Error("No Customer were found");
    }

    await ormRepository.update(customers[0].id, {
      name,
      email,
    });

    return customers[0];
  }
}
