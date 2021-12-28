import { validate, ValidationError } from 'class-validator'
import BuildStructureError from './errors/BuildStructureError'
import StructureError from './errors/structureError/StructureError'
import StructureErrorDetail from './errors/structureError/StructureErrorDetail'

export default class ObjectValidator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public async run (objectToValidate: Object): Promise<void> {
    const errors = await validate(objectToValidate)
    if (errors.length > 0) { this.throwStructureError(errors) }
  }

  protected throwStructureError (errors: ValidationError[]): void {
    throw new StructureError((this.errors(errors)))
  }

  protected errors (errors: ValidationError[]): StructureErrorDetail[] {
    return new BuildStructureError().run(errors)
  }
}
