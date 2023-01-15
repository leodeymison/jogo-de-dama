import { IndexType, ItemSelectType } from "../types";

export const RemoveSelectSquare = (
  itenSelect: ItemSelectType,
  index: IndexType
) => {
  return JSON.stringify(itenSelect) === JSON.stringify(index) ? true : false;
};
