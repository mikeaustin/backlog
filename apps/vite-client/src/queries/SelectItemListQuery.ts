import { gql, useQuery } from "urql";

import type { UserId, ItemId, StatusId, TeamKeySeqId } from ".";

type SelectItemListQuery = {
  items: {
    id: ItemId;
    title: string;
    statusId: StatusId;
    description: string;
    sortOrder: number;
    flagged: boolean;
    itemsAssignees: {
      assignee: {
        id: UserId;
        displayName: string;
      };
    }[];
  }[];
};

const SELECT_ITEM_LIST_QUERY = gql<SelectItemListQuery>`
  query SelectItemList {
    items(order_by: { sortOrder: asc }) {
      id
      title
      statusId
      description
      sortOrder
      flagged
      itemsAssignees {
        itemId
        userId
        assignee {
          id
          displayName
        }
      }
    }
  }
`;

function useSelectItemListQuery() {
  const [{ data }] = useQuery({
    query: SELECT_ITEM_LIST_QUERY,
  });

  return (
    data && {
      items: data.items.map(({ itemsAssignees, ...item }) => ({
        ...item,
        assignees: itemsAssignees.map((itemAssignee) => itemAssignee.assignee),
      })),
    }
  );
}

export default useSelectItemListQuery;

export { SELECT_ITEM_LIST_QUERY };
