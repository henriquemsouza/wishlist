import { Router } from 'express';

import RandomSampleRoutes from './RandomSample/RandomSampleRoutes';

const Routes = Router();

Routes.use('/sample', RandomSampleRoutes);

export default Routes;
