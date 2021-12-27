import { RoutesBuilder } from "../../utils/RoutesBuilder";
import CreateWishlistRouter from "./CreateWishlist/CreateWishlistRouter";


const WishlistRoutes = new RoutesBuilder()
  .post('/create', CreateWishlistRouter)
  .build();

export default WishlistRoutes;
