import {useEffect, useState} from 'react';
import {retrieveMessages} from '../api/retrieveMessages';
import {assertIsMessageBody, MessageBody} from '../api/types';
import {MessageList} from './MessageList';
import {sendMessage} from '../api/sendMessage';
import {MessageForm} from './MessageForm';

export function ChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  // useState cant monitor an object, bcz its reference is the same?
  const [msgs, setMsgs] = useState<MessageBody[]>([]);
/*
  useEffect(() => {
    let cancel = false;
    getMessages().then((data) => {
      if (!cancel) {
        setChatHistory(chatHistory.addMessage(data))
        setIsLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, []);
*/
  async function handleSave(sendMsgBody: MessageBody) {
    sendMsgBody.usermId = 1;
    sendMsgBody.role = 'user';
    sendMsgBody.datetime = new Date().getTime();

    // 解决了这里的bug，原来两次setMsgs拼的都是展开的msgs这个数组，其实这个数组根本就没变过、
    // 所以界面上收到的消息把发出的消息覆盖了，拼完发的消息，就该修改这个数组，再去拼收到的消息
    const msgsWithSend = [sendMsgBody, ...msgs];
    // 先将 sendMsgBody 添加到消息列表中
    setMsgs(msgsWithSend);

    const retMsgBody: MessageBody = await sendMessage(sendMsgBody);
    assertIsMessageBody(retMsgBody);
    console.log("handleSave retMsgBody: ", retMsgBody);

    // 收到 retMsgBody 后，再将其添加到消息列表中
    setMsgs([retMsgBody, ...msgsWithSend]);
  }

  if (isLoading) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }
  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 font-bold">Shell GPT</h2>
      <MessageForm onSave={handleSave}/>
      <MessageList msgs={msgs}/>
    </div>
  );
}
