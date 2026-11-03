type UserId = string & { readonly __type: unique symbol };

type ItemId = string & { readonly __type: unique symbol };
type TeamKeySeqId = string & { readonly __type: unique symbol };

type StatusId = "BACKLOG" | "IN_PROGRESS";

export { default as useSelectItemListQuery } from "./SelectItemListQuery";

export type {
  UserId, //
  ItemId,
  StatusId,
  TeamKeySeqId,
};
