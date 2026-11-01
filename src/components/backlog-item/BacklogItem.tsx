import { View, Text, Icon, Avatar } from "onyx-ui"
import { BookCheckIcon } from "lucide-react"

import styles from '../../App.module.css'

type TeamKeySeqId = string & { readonly __type: unique symbol };

function BacklogItem({
  title,
  teamKeySeqId,
}: Delegate<{
  title: string,
  teamKeySeqId: TeamKeySeqId,
}, typeof View<"div">>) {
  return (
    <View horizontal className={styles.BacklogItem} fillColor="white" padding="8px 16px" spacing="12px">
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
          <Avatar imageOnly name="Mike Austin" />
          <Avatar imageOnly name="John Connor" />
        </Avatar.Stack>
      </View>
    </View>
  );
}

export default BacklogItem;
