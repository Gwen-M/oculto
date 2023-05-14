import useSendMessage from '@components/utils/hooks/useSendMessage';
import type { Conversation } from '@xmtp/xmtp-js';
import type { FC } from 'react';
import { Button } from 'ui';

interface MessageHeaderProps {
  selectedConversation: Conversation;
}

const AskAddress: FC<MessageHeaderProps> = ({ selectedConversation }) => {
  const { sendMessage } = useSendMessage(selectedConversation);

  return (
    <div className="divider flex items-center justify-between px-4 py-2">
      <Button
        onClick={() =>
          sendMessage(
            'Hey, can you send me your zk address? You can find it here --> https://app.zkbob.com/'
          )
        }
        variant="super"
        aria-label="Send money"
      >
        <div className="flex items-center space-x-2">
          <span>Ask a donation address</span>
        </div>
      </Button>
    </div>
  );
};

export default AskAddress;
