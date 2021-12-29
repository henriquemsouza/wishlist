import { RoutesBuilder } from "../../utils/RoutesBuilder";
import CreateWishlistRouter from "./CreateWishlist/CreateWishlistRouter";
import CreateWishlistItemRouter from "./CreateWishlistItem/CreateWishlistItemRouter";


const WishlistRoutes = new RoutesBuilder()
  .post('/create', CreateWishlistRouter)
  .post('/create/item', CreateWishlistItemRouter)

  .build();

export default WishlistRoutes;
