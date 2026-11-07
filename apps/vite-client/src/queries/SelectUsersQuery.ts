import { gql, useQuery } from "urql";

import type { User } from "./types";
import { USER_FRAGMENT } from "./fragments";

type SelectItemListQuery = {
  users: User[];
};

const SELECT_USER_LIST_QUERY = gql<SelectItemListQuery>`
  query SelectUserList {
    users(order_by: { displayName: asc }) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

function useSelectUserListQuery({ pause }: { pause: boolean }) {
  const [{ data }] = useQuery({
    query: SELECT_USER_LIST_QUERY,
    pause,
  });

  return (
    data && {
      users: data.users,
    }
  );
}

export default useSelectUserListQuery;

export { SELECT_USER_LIST_QUERY };
