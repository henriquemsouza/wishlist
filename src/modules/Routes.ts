import { Router } from "express";
import CustomerRoutes from "./Customer/CustomerRoutes";

import WishlistRoutes from "./Wishlist/WishlistRoutes";

import swaggerUi from 'swagger-ui-express'
import * as document from '../../docs/base/wishlist-documentation.json'



const Routes = Router();

Routes.use("/customer", CustomerRoutes);
Routes.use("/wishlist", WishlistRoutes);

Routes.get('/api-docs', swaggerUi.setup(document));
Routes.use('/api-docs', swaggerUi.serve);

export default Routes;
