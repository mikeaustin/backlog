type UserId = string & { readonly __type: unique symbol };

type ItemId = string & { readonly __type: unique symbol };
type TeamKeySeqId = string & { readonly __type: unique symbol };

export { default as useSelectItemListQuery } from "./SelectItemListQuery";

export type {
  UserId,
  ItemId,
  TeamKeySeqId,
}
