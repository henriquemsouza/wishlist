import { Container } from "inversify";

import RandomSampleContainer from "../../modules/RandomSample/RandomSampleContainer";
import ProductService from "../../services/product/productService";
import { Newable } from "../../shared/types";
import AxiosHttpHandle from "../http/AxiosHttpHandler";

const container = new Container({ defaultScope: "Singleton" });

container.bind<AxiosHttpHandle>(AxiosHttpHandle).toSelf();
container.bind<ProductService>(ProductService).toSelf();


container.load(RandomSampleContainer);

export default container;

export const GetFromContainer = <T>(obj: Newable<T>) => container.get<T>(obj);
