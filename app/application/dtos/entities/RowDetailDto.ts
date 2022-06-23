import { RowValueDto } from "./RowValueDto";

export type RowDetailDto = {
  id: string | null;
  folio: number | null;
  values: RowValueDto[];
};
