import { ContainerModule } from "inversify";

import CreateWishlistItemCase from "./CreateWishlistItem/CreateWishlistItemCase";
import CreateWishlistItemRouter from "./CreateWishlistItem/CreateWishlistItemRouter";
import DeleteWishlistItemCase from "./DeleteWishlistItem/DeleteWishlistItemCase";
import DeleteWishlistItemRouter from "./DeleteWishlistItem/DeleteWishlistItemRouter";
import ListWishlistCase from "./ListWishlist/ListWishlistCase";
import ListWishlistRouter from "./ListWishlist/ListWishlistRouter";

const WishlistContainer = new ContainerModule((bind) => {
  bind<CreateWishlistItemCase>(CreateWishlistItemCase).toSelf();
  bind<CreateWishlistItemRouter>(CreateWishlistItemRouter).toSelf();
  bind<ListWishlistCase>(ListWishlistCase).toSelf();
  bind<ListWishlistRouter>(ListWishlistRouter).toSelf();
  bind<DeleteWishlistItemCase>(DeleteWishlistItemCase).toSelf();
  bind<DeleteWishlistItemRouter>(DeleteWishlistItemRouter).toSelf();
});

export default WishlistContainer;
