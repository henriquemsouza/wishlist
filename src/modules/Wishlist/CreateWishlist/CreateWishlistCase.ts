import { OK } from "http-status";
import { injectable } from "inversify";
import { UseCase } from "../../../shared/contracts";
import ExceptionHandler from "../../../shared/decorators/ExceptionHandler";
import HttpResponse from "../../../shared/responses/HttpResponse";

import { CreateWishlistResponse } from "./CreateWishlistInterface";

@injectable()
export default class CreateWishlistCase implements UseCase {
  @ExceptionHandler()
  async execute() {
    const randomString = `${Math.floor(Math.random() * (10 - 1 + 10))}`;

    return HttpResponse.success<CreateWishlistResponse>({
      body: {
        message: randomString,
      },
      statusCode: OK,
    });
  }
}
