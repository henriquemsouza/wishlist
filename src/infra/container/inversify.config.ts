import { Container } from "inversify";
import CustomerContainer from "../../modules/Customer/CustomerContainer";

import WishlistContainer from "../../modules/Wishlist/WishlistContainer";
import ProductService from "../../services/product/productService";
import { Newable } from "../../shared/types";
import AxiosHttpHandle from "../http/AxiosHttpHandler";

const container = new Container({ defaultScope: "Singleton" });

container.bind<AxiosHttpHandle>(AxiosHttpHandle).toSelf();
container.bind<ProductService>(ProductService).toSelf();

container.load(CustomerContainer);
container.load(WishlistContainer);

export default container;

export const GetFromContainer = <T>(obj: Newable<T>) => container.get<T>(obj);
