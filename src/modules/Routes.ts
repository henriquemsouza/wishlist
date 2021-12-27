import { Router } from "express";
import CustomerRoutes from "./Customer/CustomerRoutes";

import WishlistRoutes from "./Wishlist/WishlistRoutes";

const Routes = Router();

Routes.use("/customer", CustomerRoutes);
Routes.use("/wishlist", WishlistRoutes);

export default Routes;
