import { gql, useMutation, type AnyVariables } from "urql";

import type { ItemId, StatusId, TeamKeySeqId } from ".";

type Item = {
  id: ItemId;
  title: string;
  statusId: StatusId;
  teamKeySeqId: TeamKeySeqId;
};

type UpdateItemMutation = {
  update_items_by_pk: Item;
};

const UPDATE_ITEM_MUTATION = gql<UpdateItemMutation>`
  mutation UpdateItem($id: uuid!, $input: items2_set_input) {
    update_items2_by_pk(_set: $input, pk_columns: { id: $id }) {
      id
      title
      statusId
      teamKeySeqId
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
