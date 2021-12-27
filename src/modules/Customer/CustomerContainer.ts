import { ContainerModule } from "inversify";
import CreateCustomerCase from "./CreateCustomer/CreateCustomerCase";
import CreateCustomerRouter from "./CreateCustomer/CreateCustomerRouter";
import UpdateCustomerCase from "./UpdateCustomer/UpdateCustomerCase";
import UpdateCustomerRouter from "./UpdateCustomer/UpdateCustomerRouter";


const CustomerContainer = new ContainerModule((bind) => {
  bind<CreateCustomerCase>(CreateCustomerCase).toSelf();
  bind<CreateCustomerRouter>(CreateCustomerRouter).toSelf();
  bind<UpdateCustomerCase>(UpdateCustomerCase).toSelf();
  bind<UpdateCustomerRouter>(UpdateCustomerRouter).toSelf();
});

export default CustomerContainer;
