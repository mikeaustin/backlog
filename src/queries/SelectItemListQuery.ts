import { gql, useQuery } from "urql";

import type { UserId, ItemId, StatusId, TeamKeySeqId } from ".";

type SelectItemListQuery = {
  items2: {
    id: ItemId;
    title: string;
    statusId: StatusId;
    teamKeySeqId: TeamKeySeqId;
    order: number;
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
    items2(order_by: { order: asc }) {
      id
      title
      statusId
      teamKeySeqId
      order
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
      items: data.items2.map(({ itemsAssignees, ...item }) => ({
        ...item,
        assignees: itemsAssignees.map((itemAssignee) => itemAssignee.assignee),
      })),
    }
  );
}

export default useSelectItemListQuery;
