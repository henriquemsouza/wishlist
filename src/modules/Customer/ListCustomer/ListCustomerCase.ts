import { OK } from "http-status";
import { injectable } from "inversify";
import CustomerEntity from "../../../infra/db/entities/CustomerEntity";
import {
  createDBConnection,
  getTypeORMConnection,
} from "../../../infra/db/utils/ConnectionHelper";
import { GenericUseCase } from "../../../shared/contracts";
import ExceptionHandler from "../../../shared/decorators/ExceptionHandler";
import GenericException from "../../../shared/exceptions/GenericException";
import HttpResponse from "../../../shared/responses/HttpResponse";
import { ListCustomerResponse } from "./ListInterface";
import { SelectQueryBuilder } from "typeorm";

@injectable()
export default class ListCustomerCase implements GenericUseCase {
  @ExceptionHandler()
  async execute(id: string) {
    try {
      await createDBConnection();

      const ormRepository =
        getTypeORMConnection().getRepository(CustomerEntity);

      const result = await ormRepository.find(this.buildSearchProperties(id));

      return HttpResponse.success<ListCustomerResponse>({
        body: {
          customers: result,
        },
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

  private buildSearchProperties(id: string) {
    return {
      where: (qb: SelectQueryBuilder<CustomerEntity>) => {
        if (id) qb.where("CustomerEntity.id = :id", { id });
      },
      relations: ["wishlist"],
    };
  }
}
