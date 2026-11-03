import { useMemo } from "react";
import { gql, useClient } from "urql";

import { type ItemId, useUpdateItemMutation } from ".";

type SelectItemOrderQuery = {
  prevItem: {
    id: string;
    sortOrder: number;
  }[];
  nextItem: {
    id: string;
    sortOrder: number;
  }[];
};

const SELECT_ITEM_ORDER_QUERY = gql<SelectItemOrderQuery>`
  query SelectItemOrder($targetItemOrder: float8!) {
    prevItem: items2(
      order_by: { order: desc }
      where: { sortOrder: { _lt: $targetItemOrder } }
      limit: 1
    ) {
      id
      sortOrder
    }
    nextItem: items2(
      order_by: { order: asc }
      where: { sortOrder: { _gt: $targetItemOrder } }
      limit: 1
    ) {
      id
      sortOrder
    }
  }
`;

function useUpdateItemOrderMutation() {
  const client = useClient();

  const updateItem = useUpdateItemMutation();

  const updateItemOrder = useMemo(
    () =>
      async (sourceItemId: ItemId, targetItemOrder: number, aboveOrBelow: "above" | "below") => {
        const { data } = await client.query(
          SELECT_ITEM_ORDER_QUERY,
          {
            targetItemOrder,
          },
          {
            requestPolicy: "network-only",
          },
        );

        let updatedSortOrder;

        if (data && aboveOrBelow === "above") {
          if (data.prevItem[0] === undefined) {
            updatedSortOrder = targetItemOrder / 2;
          } else {
            updatedSortOrder = targetItemOrder - (targetItemOrder - data.prevItem[0].sortOrder) / 2;
          }
        } else if (data && aboveOrBelow === "below") {
          if (data.nextItem[0] === undefined) {
            updatedSortOrder = targetItemOrder + 1;
          } else {
            updatedSortOrder = targetItemOrder + (data.nextItem[0].sortOrder - targetItemOrder) / 2;
          }
        }

        updateItem({
          id: sourceItemId,
          input: {
            sortOrder: updatedSortOrder,
          },
        });
      },
    [client, updateItem],
  );

  return updateItemOrder;
}

export default useUpdateItemOrderMutation;
