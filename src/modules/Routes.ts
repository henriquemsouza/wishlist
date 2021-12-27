import { Router } from 'express';

import RandomSampleRoutes from './RandomSample/RandomSampleRoutes';
import WishlistRoutes from './Wishlist/WishlistRoutes';

const Routes = Router();

Routes.use('/sample', RandomSampleRoutes);
Routes.use('/wishlist', WishlistRoutes);


export default Routes;
