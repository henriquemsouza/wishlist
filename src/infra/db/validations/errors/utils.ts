import StructureErrorDetail from "./structureError/StructureErrorDetail";
import { StructureErrorDetailType } from "./structureError/StructureErrorDetailType";

export const buildErrorsMessage = (details: StructureErrorDetail[]) => {
  const errors = [];
  details.forEach((x) => {
    let message = `Field: [${x.field}] ${x.type}`;
    if (x.type === StructureErrorDetailType.Emptiness) {
      message = `Field: [${x.field}] can't be empty`;
    }

    if (x.type === StructureErrorDetailType.InvalidEmail) {
      message = `Field: [${x.field}] It's not a valid email`;
    }

    errors.push(message);
  });
  return errors;
};
