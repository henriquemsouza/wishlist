import { ContainerModule } from "inversify";
import CreateWishlistCase from "./CreateWishlist/CreateWishlistCase";
import CreateWishlistRouter from "./CreateWishlist/CreateWishlistRouter";

const WishlistContainer = new ContainerModule((bind) => {
  bind<CreateWishlistCase>(CreateWishlistCase).toSelf();
  bind<CreateWishlistRouter>(CreateWishlistRouter).toSelf();
});

export default WishlistContainer;
