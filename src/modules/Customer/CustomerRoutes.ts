import { RoutesBuilder } from "../../utils/RoutesBuilder";
import CreateCustomerRouter from "./CreateCustomer/CreateCustomerRouter";
import DeleteCustomerRouter from "./DeleteCustomer/DeleteCustomerRouter";
import ListCustomerRouter from "./ListCustomer/ListCustomerRouter";
import UpdateCustomerRouter from "./UpdateCustomer/UpdateCustomerRouter";

const CustomerRoutes = new RoutesBuilder()
  .post("/create", CreateCustomerRouter)
  .patch("/update", UpdateCustomerRouter)
  .delete("/delete", DeleteCustomerRouter)
  .get("/list", ListCustomerRouter)
  .build();

export default CustomerRoutes;
