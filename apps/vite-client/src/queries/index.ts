import type useSelectItemListQuery from "./SelectItemListQuery";

export { default as useSelectItemListQuery } from "./SelectItemListQuery";
export { default as useSelectUserListQuery } from "./SelectUserListQuery";
export { default as useCreateItemMutation } from "./CreateItemMutation";
export { default as useUpdateItemMutation } from "./UpdateItemMutation";

type User = Exclude<
  ReturnType<typeof useSelectItemListQuery>,
  undefined
>["items"][number]["assignees"][number];

type Item = Exclude<ReturnType<typeof useSelectItemListQuery>, undefined>["items"][number];

type Criterion = Exclude<
  ReturnType<typeof useSelectItemListQuery>,
  undefined
>["items"][number]["criteria"][number];

export type { User, Item, Criterion };
