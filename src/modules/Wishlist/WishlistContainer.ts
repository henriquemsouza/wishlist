import { ContainerModule } from "inversify";
import CreateWishlistCase from "./CreateWishlist/CreateWishlistCase";
import CreateWishlistRouter from "./CreateWishlist/CreateWishlistRouter";
import CreateWishlistItemCase from "./CreateWishlistItem/CreateWishlistItemCase";
import CreateWishlistItemRouter from "./CreateWishlistItem/CreateWishlistItemRouter";

const WishlistContainer = new ContainerModule((bind) => {
  bind<CreateWishlistCase>(CreateWishlistCase).toSelf();
  bind<CreateWishlistRouter>(CreateWishlistRouter).toSelf();
  bind<CreateWishlistItemCase>(CreateWishlistItemCase).toSelf();
  bind<CreateWishlistItemRouter>(CreateWishlistItemRouter).toSelf();
});

export default WishlistContainer;
