import useSendMessage from '@components/utils/hooks/useSendMessage';
import type { Conversation } from '@xmtp/xmtp-js';
import type { FC } from 'react';
import { useState } from 'react';
import { Button, Input, Spinner } from 'ui';
import { parseEther } from 'viem';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';

interface SendBobProps {
  selectedConversation: Conversation;
  zkAddress: string;
}
const directDepositAddress = '0x668c5286eAD26fAC5fa944887F9D2F20f7DDF289';

const SendBob: FC<SendBobProps> = ({ zkAddress, selectedConversation }) => {
  const [amount, setAmount] = useState<string>('0');

  const { address } = useAccount();

  const { sendMessage } = useSendMessage(selectedConversation);

  let { config } = usePrepareContractWrite({
    address: directDepositAddress,
    abi: [
      {
        inputs: [
          { internalType: 'address', name: '_fallbackUser', type: 'address' },
          { internalType: 'uint256', name: '_amount', type: 'uint256' },
          { internalType: 'string', name: '_zkAddress', type: 'string' }
        ],
        name: 'directDeposit',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ],
    functionName: 'directDeposit',
    chainId: 137,
    args: [address!, parseEther(amount as any), zkAddress]
  });
  const { write: sendTx } = useContractWrite({
    ...config
  });
  const [sendingMoney, setSendingMoney] = useState<boolean>(false);

  const handleStoreNb = (value: string) => {
    setAmount(value);
  };

  const handleSendMoney = () => {
    setSendingMoney(true);

    sendTx?.();
    setSendingMoney(false);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSendMoney();
    }
  };

  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder={`Amount to send`}
        onKeyDown={handleKeyDown}
        onChange={(e) => handleStoreNb(e.target.value)}
      />
      <Button onClick={handleSendMoney} variant="super" aria-label="Send money">
        <div className="flex items-center space-x-2">
          <span>Send anonymously</span>
          {sendingMoney && <Spinner size="sm" className="h-5 w-5" />}
        </div>
      </Button>
      <Button disabled={true} variant="super" aria-label="Send money">
        <div className="flex items-center space-x-2">
          <span>Zap stablecoin (coming soon)</span>
        </div>
      </Button>
    </div>
  );
};

export default SendBob;
