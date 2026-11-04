import { type Delegate, View, Text, Icon, Avatar } from "onyx-ui";
import { BookCheckIcon, SquareIcon } from "lucide-react";

import type { UserId, ItemId, StatusId } from "../../queries";
import ItemStatuses from "../../data/ItemStatuses";
import { useSortable } from "../../hooks";

import styles from "./Backlog.module.css";

function Flag() {
  return (
    <svg
      className={styles.Flag}
      height="16"
      width="16"
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <polygon points="0,0 16,0 0,16" style={{ fill: "var(--onyx-red-4)", strokeWidth: 3 }} />
    </svg>
  );
}

function BacklogItem({
  id,
  title,
  statusId,
  sortOrder,
  flagged,
  assignees,
  sourceElementRef,
  onItemSelect,
  onItemMove,
}: Delegate<
  {
    id: ItemId;
    title: string;
    statusId: StatusId;
    sortOrder: number;
    flagged: boolean;
    assignees: { id: UserId; displayName: string }[];
    sourceElementRef: React.RefObject<HTMLElement | null>;
    onItemSelect?: (id: ItemId) => void;
    onItemMove?: (
      sourceItemId: ItemId,
      targetItemOrder: number,
      aboveOrBelow: "above" | "below",
    ) => void;
  },
  typeof View<"div">
>) {
  const ref = useSortable({ itemId: id }, sourceElementRef, ({ sourceItemId, aboveOrBelow }) => {
    onItemMove?.(sourceItemId, sortOrder, aboveOrBelow);
  });

  return (
    <View
      horizontal
      draggable
      ref={ref}
      id={id}
      className={styles.BacklogItem}
      cursor="pointer"
      fillColor="white"
      padding="12px 16px"
      spacing="12px"
      onClick={() => onItemSelect?.(id)}
    >
      {flagged && <Flag />}
      <View flex spacing="8px">
        <Text fontWeight="600">{title}</Text>
        <View horizontal align="middle left" spacing="4px">
          <Icon bleed icon={BookCheckIcon} size={14} />
          <Text light bold fontSize="12px">
            {sortOrder}
          </Text>
        </View>
      </View>
      <View horizontal align="middle justify" spacing="16px">
        <Avatar.Stack>
          {assignees.map((assignee) => (
            <Avatar
              key={assignee.id}
              imageOnly
              name={assignee.displayName}
              tooltip={`Developer: ${assignee.displayName}`}
            />
          ))}
        </Avatar.Stack>
        <View horizontal align="middle left" spacing="4px" style={{ minWidth: 90 }}>
          <Icon
            icon={SquareIcon}
            color={ItemStatuses[statusId].iconColor}
            size={14}
            fill="currentColor"
          />
          <Text bold>{ItemStatuses[statusId].label}</Text>
        </View>
      </View>
    </View>
  );
}

export default BacklogItem;
