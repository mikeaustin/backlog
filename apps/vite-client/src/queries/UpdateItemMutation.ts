import { gql, useMutation, type AnyVariables } from "urql";

import type { ItemId, StatusId, TeamKeySeqId } from ".";

type Item = {
  id: ItemId;
  title: string;
  statusId: StatusId;
  teamKeySeqId: TeamKeySeqId;
  sortOrder: number;
  flagged: boolean;
};

type UpdateItemMutation = {
  update_items_by_pk: Item;
};

const UPDATE_ITEM_MUTATION = gql<UpdateItemMutation>`
  mutation UpdateItem($id: uuid!, $input: items_set_input) {
    update_items_by_pk(_set: $input, pk_columns: { id: $id }) {
      id
      title
      statusId
      teamKeySeqId
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

function useUpdateItemMutation() {
  const [, updateItem] = useMutation(UPDATE_ITEM_MUTATION);

  return async ({ id, input }: { id: ItemId; input: AnyVariables }) => {
    await updateItem({
      id,
      input,
    });
  };
}

export default useUpdateItemMutation;
