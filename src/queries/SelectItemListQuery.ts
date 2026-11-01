import { gql, useQuery } from "urql";

import type { UserId, ItemId, TeamKeySeqId } from ".";

type SelectItemListQuery = {
  items2: {
    id: ItemId,
    title: string,
    teamKeySeqId: TeamKeySeqId,
    itemsAssignees: {
      assignee: {
        id: UserId,
        displayName: string,
      }
    }[],
  }[],
};

const SELECT_ITEM_LIST_QUERY = gql<SelectItemListQuery>`
  query SelectItemList {
    items2 {
      id
      title
      teamKeySeqId
      itemsAssignees {
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

  return data;
}

export default useSelectItemListQuery;
