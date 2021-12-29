import { ContainerModule } from "inversify";
import CreateCustomerCase from "./CreateCustomer/CreateCustomerCase";
import CreateCustomerRouter from "./CreateCustomer/CreateCustomerRouter";
import DeleteCustomerCase from "./DeleteCustomer/DeleteCustomerCase";
import DeleteCustomerRouter from "./DeleteCustomer/DeleteCustomerRouter";
import ListCustomerCase from "./ListCustomer/ListCustomerCase";
import ListCustomerRouter from "./ListCustomer/ListCustomerRouter";
import UpdateCustomerCase from "./UpdateCustomer/UpdateCustomerCase";
import UpdateCustomerRouter from "./UpdateCustomer/UpdateCustomerRouter";


const CustomerContainer = new ContainerModule((bind) => {
  bind<CreateCustomerCase>(CreateCustomerCase).toSelf();
  bind<CreateCustomerRouter>(CreateCustomerRouter).toSelf();
  bind<UpdateCustomerCase>(UpdateCustomerCase).toSelf();
  bind<UpdateCustomerRouter>(UpdateCustomerRouter).toSelf();
  bind<DeleteCustomerCase>(DeleteCustomerCase).toSelf();
  bind<DeleteCustomerRouter>(DeleteCustomerRouter).toSelf();
  bind<ListCustomerCase>(ListCustomerCase).toSelf();
  bind<ListCustomerRouter>(ListCustomerRouter).toSelf();
});

export default CustomerContainer;
