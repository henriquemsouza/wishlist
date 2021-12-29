import { ValidationError } from "class-validator";
import StructureErrorDetail from "./structureError/StructureErrorDetail";
import { StructureErrorDetailType } from "./structureError/StructureErrorDetailType";

export default class BuildStructureError {
  public run(errors: ValidationError[]): StructureErrorDetail[] {
    return errors.reduce(
      (prev: StructureErrorDetail[], cur: ValidationError) => [
        ...prev,
        ...this.mapConstraints(cur),
        ...this.mapChildren(cur),
      ],
      []
    );
  }

  private mapChildren(error: ValidationError): StructureErrorDetail[] {
    const errorDetails: StructureErrorDetail[] = [];
    // tslint:disable-next-line: no-unused-expression
    error.children &&
      error.children.map((cur) =>
        cur.children.length
          ? cur.children.map((child) =>
              errorDetails.push(
                ...this.mapConstraints(
                  child,
                  `${error.property}[${cur.property}].${child.property}`
                )
              )
            )
          : errorDetails.push(
              ...this.mapConstraints(cur, `${error.property}.${cur.property}`)
            )
      );
    return errorDetails;
  }

  private mapConstraints(
    error: ValidationError,
    fieldName = ""
  ): StructureErrorDetail[] {
    return Object.keys(error.constraints || []).map((key) => ({
      type: this.buildStructureErrorDetailType(key),
      field: fieldName || error.property,
    }));
  }

  protected buildStructureErrorDetailType(
    key: string
  ): StructureErrorDetailType {
    if (key === "isNotEmpty") {
      return StructureErrorDetailType.Emptiness;
    }
    if (key === "length") {
      return StructureErrorDetailType.Length;
    }

    if (key === "isPositive") {
      return StructureErrorDetailType.NotPositive;
    }
    if (key === "isNumber") {
      return StructureErrorDetailType.NotNumber;
    }
    if (key === "min") {
      return StructureErrorDetailType.NotPositive;
    }

    if (key === "isEmail") {
      return StructureErrorDetailType.InvalidEmail;
    }
    return StructureErrorDetailType.Unknown;
  }
}
