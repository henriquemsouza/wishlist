import { RoutesBuilder } from "../../utils/RoutesBuilder";
import CreateCustomerRouter from "./CreateCustomer/CreateCustomerRouter";
import UpdateCustomerRouter from "./UpdateCustomer/UpdateCustomerRouter";

const CustomerRoutes = new RoutesBuilder()
  .post("/create", CreateCustomerRouter)
  .patch("/update", UpdateCustomerRouter)
  .build();

export default CustomerRoutes;
