import { StructureErrorDetailType } from "./StructureErrorDetailType";

export default interface StructureErrorDetail {
  type: StructureErrorDetailType;
  field: string;
}
