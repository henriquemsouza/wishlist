import { RoutesBuilder } from "../../utils/RoutesBuilder";
import CreateCustomerRouter from "./CreateCustomer/CreateCustomerRouter";


const CustomerRoutes = new RoutesBuilder()
  .post('/create', CreateCustomerRouter)
  .build();

export default CustomerRoutes;
