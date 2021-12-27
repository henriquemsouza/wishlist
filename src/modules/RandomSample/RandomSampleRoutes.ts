import { RoutesBuilder } from "../../utils/RoutesBuilder";
import SampleRouter from "./Sample/SampleRouter";


const RandomSampleRoutes = new RoutesBuilder()
  .get('/initial-route', SampleRouter)
  .build();

export default RandomSampleRoutes;
