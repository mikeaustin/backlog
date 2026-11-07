type UserId = string & { readonly __type: unique symbol };
type ItemId = string & { readonly __type: unique symbol };

type StatusId = "BACKLOG" | "IN_PROGRESS" | "DONE";

type User = {
  id: UserId;
  displayName: string;
  metadata?: {
    roleLabel?: string;
  };
};

type Item = {
  id: ItemId;
  title: string;
  seqId: number;
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

export type { UserId, ItemId, StatusId, User, Item };
