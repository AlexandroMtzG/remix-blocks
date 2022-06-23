import { PropertyOption, Media } from "@prisma/client";
import { PropertyWithDetails } from "~/utils/db/entities/entities.db.server";
import { RowWithDetails } from "~/utils/db/entities/rows.db.server";

export type RowValueDto = {
  id?: string | null;
  property: PropertyWithDetails;
  propertyId: string;
  relatedRowId?: string | undefined;
  idValue?: string | undefined;
  textValue?: string | undefined;
  numberValue?: number | undefined;
  dateValue?: Date | undefined;
  booleanValue?: boolean | undefined;
  selectedOption?: PropertyOption | undefined;
  relatedRow?: RowWithDetails | undefined;
  media?: Media[];
};
