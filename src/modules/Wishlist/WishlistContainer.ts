import { ContainerModule } from "inversify";
import CreateWishlistCase from "./CreateWishlist/CreateWishlistCase";
import CreateWishlistRouter from "./CreateWishlist/CreateWishlistRouter";
import CreateWishlistItemCase from "./CreateWishlistItem/CreateWishlistItemCase";
import CreateWishlistItemRouter from "./CreateWishlistItem/CreateWishlistItemRouter";
import ListWishlistCase from "./ListWishlist/ListWishlistCase";
import ListWishlistRouter from "./ListWishlist/ListWishlistRouter";

const WishlistContainer = new ContainerModule((bind) => {
  bind<CreateWishlistCase>(CreateWishlistCase).toSelf();
  bind<CreateWishlistRouter>(CreateWishlistRouter).toSelf();
  bind<CreateWishlistItemCase>(CreateWishlistItemCase).toSelf();
  bind<CreateWishlistItemRouter>(CreateWishlistItemRouter).toSelf();
  bind<ListWishlistCase>(ListWishlistCase).toSelf();
  bind<ListWishlistRouter>(ListWishlistRouter).toSelf();
});

export default WishlistContainer;
