import { gql, useQuery } from "urql";

import type { Item } from "./types";
import { ITEM_FRAGMENT } from "./fragments";

type SelectItemListQuery = {
  items: Item[];
};

const SELECT_ITEM_LIST_QUERY = gql<SelectItemListQuery>`
  query SelectItemList {
    items(order_by: { sortOrder: asc }) {
      ...ItemFragment
    }
  }
  ${ITEM_FRAGMENT}
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
