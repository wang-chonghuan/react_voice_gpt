import React, {useEffect, useState} from 'react';
import {assertIsMessageBody, MessageBody} from '../api/types';
import {sendMessage} from '../api/sendMessage';
import {MessageForm} from './MessageForm';
import {v4 as uuidv4} from 'uuid';
import {textToSpeech} from "../api/textToSpeech";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {HeaderBar} from "./HeaderBar";
import {MessageList} from "./MessageList";
import {MessageBox} from "./MessageBox";

export function ChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  // useState cant monitor an object, bcz its reference is the same?
  const [msgs, setMsgs] = useState<MessageBody[]>([]);
  // 我们使用useState钩子初始化一个sessionId状态变量，并在组件的初始渲染时调用uuidv4()生成唯一的会话ID。这样，在每次用户访问URL时，都会创建一个新的会话ID。
  const [sessionId] = useState(uuidv4());
  // 从context中取出user对象，目的是获得用户的jwt用于访问其他接口
  const user = useSelector((state: RootState) => state.user.user);

  async function handleSave(sendMsgBody: MessageBody) {

    // 检查user中的jwt是否存在
    if (!user || !user.jwt) {
      // 如果不存在，直接返回一个已解析的Promise
      console.log("no user info stored, cant send msg");
      return Promise.resolve();
    }

    sendMsgBody.username = user.username;
    sendMsgBody.role = 'user';
    sendMsgBody.datetime = new Date().getTime();
    sendMsgBody.sessionId = sessionId;

    // 解决了这里的bug，原来两次setMsgs拼的都是展开的msgs这个数组，其实这个数组根本就没变过、
    // 所以界面上收到的消息把发出的消息覆盖了，拼完发的消息，就该修改这个数组，再去拼收到的消息
    const msgsWithSend = [...msgs, sendMsgBody];
    // 先将 sendMsgBody 添加到消息列表中
    setMsgs(msgsWithSend);

    const retMsgBody: MessageBody = await sendMessage(sendMsgBody, user!.jwt);
    assertIsMessageBody(retMsgBody);
    console.log("handleSave retMsgBody: ", retMsgBody);

    // 收到 retMsgBody 后，再将其添加到消息列表中
    setMsgs([...msgsWithSend, retMsgBody]);

    // 在此处调用 textToSpeech 函数将收到的文本转换为语音
    try {
      await textToSpeech(retMsgBody.content, process.env.REACT_APP_AZURE_T2S_KEY!, process.env.REACT_APP_AZURE_ZONE!);
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }
  }

  if (isLoading) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <HeaderBar/>
      {/* Scrollable Box */}
      <MessageBox msgs={msgs}/>
      {/* Footer */}
      <MessageForm onSave={handleSave}/>
    </div>
  );
}
