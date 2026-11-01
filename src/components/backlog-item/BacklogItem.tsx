import { type Delegate, View, Text, Icon, Avatar } from "onyx-ui"
import { BookCheckIcon } from "lucide-react"

import type { UserId, ItemId, TeamKeySeqId } from "../../queries";

import styles from '../../App.module.css'

function BacklogItem({
  id,
  title,
  teamKeySeqId,
  itemsAssignees,
}: Delegate<{
  id: ItemId,
  title: string,
  teamKeySeqId: TeamKeySeqId,
  itemsAssignees: { assignee: { id: UserId } }[],
}, typeof View<"div">>) {
  return (
    <View horizontal id={id} className={styles.BacklogItem} fillColor="white" padding="8px 16px" spacing="12px">
      <View flex spacing="8px">
        <Text fontWeight="600">
          {title}
        </Text>
        <View horizontal align="middle left" spacing="4px">
          <Icon bleed icon={BookCheckIcon} size={14} />
          <Text light fontSize="12px">
            {teamKeySeqId}
          </Text>
        </View>
      </View>
      <View>
        <Avatar.Stack>
          {itemsAssignees.map(itemAssignee => (
            <Avatar key={itemAssignee.assignee.id} imageOnly name="Mike Austin" />
          ))}
          <Avatar imageOnly name="Mike Austin" />
          <Avatar imageOnly name="John Connor" />
        </Avatar.Stack>
      </View>
    </View>
  );
}

export default BacklogItem;
