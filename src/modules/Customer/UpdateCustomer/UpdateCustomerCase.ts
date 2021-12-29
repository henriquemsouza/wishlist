import { OK } from "http-status";
import { injectable } from "inversify";
import CustomerEntity from "../../../infra/db/entities/CustomerEntity";
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
  UpdateCustomerBody,
  UpdateCustomerResponse,
} from "./UpdateCustomerInterface";

@injectable()
export default class UpdateCustomerCase implements UseCase {
  @ExceptionHandler()
  async execute({ body }: UseCaseParams<UpdateCustomerBody>) {
    const { name, email, id } = body;

    try {
      const customer = new Customer({ name, email });
      await new ObjectValidator().run(customer);

      await createDBConnection();

      const result = await this.updateCustomer(customer, id);

      return HttpResponse.success<UpdateCustomerResponse>({
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

  private async updateCustomer(customerInfo: Customer, id: string) {
    const ormRepository = getTypeORMConnection().getRepository(CustomerEntity);

    const customers = await ormRepository.find({
      where: {
        id,
      },
    });

    if (customers.length === 0) {
      throw new Error("No Customer were found");
    }

    await ormRepository.update(customers[0].id, customerInfo);

    const result = await ormRepository.findOne({ id: customers[0].id });
    return result;
  }
}
