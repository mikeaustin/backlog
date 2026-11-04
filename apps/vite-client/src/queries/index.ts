type UserId = string & { readonly __type: unique symbol };

type ItemId = string & { readonly __type: unique symbol };
type TeamKeySeqId = string & { readonly __type: unique symbol };

type StatusId = "BACKLOG" | "IN_PROGRESS";

type Item = {
  id: ItemId;
  title: string;
  statusId: StatusId;
  sortOrder: number;
  flagged: boolean;
  itemsAssignees: {
    assignee: {
      id: UserId;
      displayName: string;
    };
  }[];
};

export { default as useSelectItemListQuery } from "./SelectItemListQuery";
export { default as useUpdateItemMutation } from "./UpdateItemMutation";

export type {
  UserId,
  ItemId,
  StatusId,
  TeamKeySeqId,
  //
  Item,
};
