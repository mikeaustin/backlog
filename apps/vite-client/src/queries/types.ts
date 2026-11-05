type UserId = string & { readonly __type: unique symbol };
type ItemId = string & { readonly __type: unique symbol };
type StatusId = "BACKLOG" | "IN_PROGRESS" | "DONE";

type Item = {
  id: ItemId;
  title: string;
  statusId: StatusId;
  description: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  flagged: boolean;
  criteria: {
    id: string;
    checkboxValue: boolean;
    inputValue: string;
  }[];
  itemsAssignees: {
    assignee: User;
  }[];
};

type User = {
  id: UserId;
  displayName: string;
};

export type { UserId, ItemId, StatusId, Item };
