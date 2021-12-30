import { OK } from "http-status";
import { inject, injectable } from "inversify";
import { SelectQueryBuilder } from "typeorm";
import WishlistEntity from "../../../infra/db/entities/WishlistEntity";
import WishlistItemEntity from "../../../infra/db/entities/WishlistItemEntity";
import {
  createDBConnection,
  getTypeORMConnection,
} from "../../../infra/db/utils/ConnectionHelper";
import ProductService from "../../../services/product/productService";
import { ProductResponse } from "../../../services/product/productServiceInterface";
import { UseCase, UseCaseParams } from "../../../shared/contracts";
import ExceptionHandler from "../../../shared/decorators/ExceptionHandler";
import HttpResponse from "../../../shared/responses/HttpResponse";
import { validateBody } from "./utils/CreateWishlistItem.utils";

import {
  CreateWishlistItemBody,
  CreateWishlistItemResponse,
} from "./interface/CreateWishlistItemInterface";

@injectable()
export default class CreateWishlistItemCase implements UseCase {
  @inject(ProductService) private productService: ProductService;

  @ExceptionHandler()
  async execute({ body }: UseCaseParams<CreateWishlistItemBody>) {
    const { product_id, customer_id } = body;

    validateBody(customer_id, product_id);

    const product = await this.findProduct(product_id);

    await createDBConnection();

    const wishlist = await this.findWishList(customer_id);

    if (!wishlist) {
      throw new Error("Wishlist Not found");
    }

    const wishlistItem = await this.saveItem(product_id, product, wishlist);

    return HttpResponse.success<CreateWishlistItemResponse>({
      body: wishlistItem,
      statusCode: OK,
    });
  }

  private async findProduct(productId: string) {
    try {
      const product = await this.productService.find(productId);

      return product;
    } catch (error) {
      if (error?.response?.status === 404) {
        throw new Error(error?.response?.data?.error_message);
      }

      throw new Error(error);
    }
  }

  private async findWishList(customerId: string): Promise<WishlistEntity> {
    const ormRepository = getTypeORMConnection().getRepository(WishlistEntity);

    const wishlist = await ormRepository.findOne({
      where: (qb: SelectQueryBuilder<WishlistEntity>) => {
        qb.where("customer_id = :customer_id", { customer_id: customerId });
      },
    });
    return wishlist;
  }

  private async saveItem(
    productId: string,
    product: ProductResponse,
    wishlist: WishlistEntity
  ) {
    const wishlistItemRepository =
      getTypeORMConnection().getRepository(WishlistItemEntity);

    const wishlistItems = await wishlistItemRepository.find({
      where: (qb: SelectQueryBuilder<WishlistItemEntity>) => {
        qb.where("product_id = :product_id", { product_id: productId });
      },
    });

    if (wishlistItems.length > 0) {
      return wishlistItems[0];
    }

    const newWishlistItem = await wishlistItemRepository.save({
      wishlist,
      price: `${product.price}`,
      image: product.image,
      brand: product.brand,
      product_id: product.id,
      title: product.title,
    });

    return newWishlistItem;
  }
}
