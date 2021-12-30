import { RoutesBuilder } from "../../utils/RoutesBuilder";
import CreateWishlistItemRouter from "./CreateWishlistItem/CreateWishlistItemRouter";
import DeleteWishlistItemRouter from "./DeleteWishlistItem/DeleteWishlistItemRouter";
import ListWishlistRouter from "./ListWishlist/ListWishlistRouter";


const WishlistRoutes = new RoutesBuilder()
  .post('/create/item', CreateWishlistItemRouter)
  .get('/list', ListWishlistRouter)
  .delete('/delete/item', DeleteWishlistItemRouter)
  .build();

export default WishlistRoutes;
