import { ContainerModule } from "inversify";
import CreateCustomerCase from "./CreateCustomer/CreateCustomerCase";
import CreateCustomerRouter from "./CreateCustomer/CreateCustomerRouter";


const CustomerContainer = new ContainerModule((bind) => {
  bind<CreateCustomerCase>(CreateCustomerCase).toSelf();
  bind<CreateCustomerRouter>(CreateCustomerRouter).toSelf();
});

export default CustomerContainer;
