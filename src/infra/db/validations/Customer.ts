import { IsNotEmpty, IsEmail } from "class-validator";
import { injectable } from "inversify";

@injectable()
export default class Customer {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(object: unknown) {
    Object.assign(this, object);
  }
}
