import { RoutesBuilder } from "../../utils/RoutesBuilder";
import CreateWishlistRouter from "./CreateWishlist/CreateWishlistRouter";
import CreateWishlistItemRouter from "./CreateWishlistItem/CreateWishlistItemRouter";
import ListWishlistRouter from "./ListWishlist/ListWishlistRouter";


const WishlistRoutes = new RoutesBuilder()
  .post('/create', CreateWishlistRouter)
  .post('/create/item', CreateWishlistItemRouter)
  .get('/list', ListWishlistRouter)
  .build();

export default WishlistRoutes;
