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

import { SelectQueryBuilder } from "typeorm";
import { Item, ListWishlistResponse } from "./ListWishlistInterface";
import WishlistEntity from "../../../infra/db/entities/WishlistEntity";
import WishlistItemEntity from "../../../infra/db/entities/WishlistItemEntity";

@injectable()
export default class ListWishlistCase implements GenericUseCase {
  @ExceptionHandler()
  async execute(customerId: string) {
    if (!customerId) {
      throw new Error("customer_id cannot be blank");
    }

    try {
      await createDBConnection();

      const ormRepository =
        getTypeORMConnection().getRepository(WishlistEntity);

      const wishlist = await ormRepository.findOne(
        this.buildSearchProperties(customerId)
      );
      const response = this.buildResponse(wishlist);

      return HttpResponse.success<ListWishlistResponse>({
        body: response,
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

  private buildSearchProperties(customerId: string) {
    const relations = customerId ? ["items", "customer"] : ["customer"];
    return {
      where: (qb: SelectQueryBuilder<WishlistEntity>) => {
        qb.leftJoin("WishlistEntity.items", "items");

        if (customerId)
          qb.where("WishlistEntity.customer_id = :customer_id", {
            customer_id: customerId,
          });
      },
      relations,
    };
  }

  private buildResponse(wishlist: WishlistEntity): ListWishlistResponse {
    const items = wishlist.items;

    const formattedItems = this.buildItems(items);
    return {
      id: wishlist.id,
      customer_id: wishlist.customer?.id,
      items: formattedItems,
    };
  }

  private buildItems(items: WishlistItemEntity[]): Item[] {
    const formattedItems: Item[] = [];

    for (const item of items) {
      formattedItems.push({
        title: item.title,
        price: Number(item.price),
        image: item.image,
        product_id: item.product_id,
      });
    }
    return formattedItems;
  }
}
