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
    const retMsgBody: MessageBody = await sendMessage(sendMsgBody);
    assertIsMessageBody(retMsgBody);
    console.log("handleSave retMsgBody: ", retMsgBody);
    setMsgs([retMsgBody, sendMsgBody, ...msgs]);
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
