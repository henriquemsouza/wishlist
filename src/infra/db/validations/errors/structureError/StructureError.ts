import StructureErrorDetail from "./StructureErrorDetail";

export default class StructureError {
  constructor(public readonly details: StructureErrorDetail[]) {}
}
