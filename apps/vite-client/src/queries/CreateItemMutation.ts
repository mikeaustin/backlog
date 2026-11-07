import { gql, useMutation, type AnyVariables, type OperationContext } from "urql";

import type { Item } from "./types";
import { ITEM_FRAGMENT } from "./fragments";
import { OfflineItem } from "./offline";

type CreateItemMutation = {
  insert_items_one: Item;
};

type CreateItemMutationInput = {
  input: {
    title: string;
    statusId: string;
  };
};

const CREATE_ITEM_MUTATION = gql<CreateItemMutation, CreateItemMutationInput>`
  mutation CreateItem($input: items_insert_input!) {
    insert_items_one(object: $input) {
      ...ItemFragment
    }
  }
  ${ITEM_FRAGMENT}
`;

function useCreateItemMutation2() {
  const [_, createItem] = useMutation(CREATE_ITEM_MUTATION);

  return createItem;
}

function useCreateItemMutation() {
  const [_, createItem] = useMutation(CREATE_ITEM_MUTATION);

  return (variables: Parameters<typeof createItem>[0], context?: Partial<OperationContext>) => {
    const items = JSON.parse(localStorage.getItem("items") ?? "[]");

    const seqId = Math.random();

    new OfflineItem(variables.input);

    items.push({
      id: crypto.randomUUID(),
      title: variables.input.title,
      statusId: variables.input.statusId,
      seqId: seqId,
      description: "",
      sortSorder: seqId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      flagged: false,
      criteria: [],
      assignees: [],
    });

    localStorage.setItem("items", JSON.stringify(items));

    const result = createItem(variables, context);

    return result;
  };
}

export default useCreateItemMutation;
