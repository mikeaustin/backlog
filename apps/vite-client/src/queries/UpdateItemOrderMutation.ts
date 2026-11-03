import { useMemo } from "react";
import { gql, useClient } from "urql";

import { type ItemId, useUpdateItemMutation } from ".";

type SelectItemOrderQuery = {
  prevItem: {
    id: string;
    order: number;
  }[];
  nextItem: {
    id: string;
    order: number;
  }[];
};

const SELECT_ITEM_ORDER_QUERY = gql<SelectItemOrderQuery>`
  query SelectItemOrder($targetItemOrder: numeric!) {
    prevItem: items2(
      order_by: { order: desc }
      where: { order: { _lt: $targetItemOrder } }
      limit: 1
    ) {
      id
      order
    }
    nextItem: items2(
      order_by: { order: asc }
      where: { order: { _gt: $targetItemOrder } }
      limit: 1
    ) {
      id
      order
    }
  }
`;

function useUpdateItemOrderMutation() {
  const client = useClient();

  const updateItem = useUpdateItemMutation();

  const updateItemOrder = useMemo(
    () =>
      async (sourceItemId: ItemId, targetItemOrder: number, aboveOrBelow: "above" | "below") => {
        const { data } = await client.query(SELECT_ITEM_ORDER_QUERY, {
          targetItemOrder,
        });

        let updatedOrder;

        if (data && aboveOrBelow === "above") {
          if (data.prevItem[0] === undefined) {
            updatedOrder = targetItemOrder - 1;
          } else {
            updatedOrder = targetItemOrder - (targetItemOrder - data.prevItem[0].order) / 2;
          }
        } else if (data && aboveOrBelow === "below") {
          if (data.nextItem[0] === undefined) {
            updatedOrder = targetItemOrder + 1;
          } else {
            updatedOrder = targetItemOrder + (data.nextItem[0].order - targetItemOrder) / 2;
          }
        }

        console.log(">>>", updatedOrder);

        updateItem({
          id: sourceItemId,
          input: {
            order: updatedOrder,
          },
        });
      },
    [client, updateItem],
  );

  return updateItemOrder;
}

export default useUpdateItemOrderMutation;
