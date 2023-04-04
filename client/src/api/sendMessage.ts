import {MessageSend, MessageBody} from './types';

export async function sendMessage(msgBody: MessageBody): Promise<MessageBody> {
  // pre prcess body
  const chatMessage: MessageSend = {
    usermId: msgBody.usermId,
    message: {
      role: msgBody.role,
      content: msgBody.content,
    },
  };
  console.log('Request body:', chatMessage);
  // send request
  console.log('Request URL:', process.env.REACT_APP_MAIVC_URL!);
  const response = await fetch(process.env.REACT_APP_MAIVC_URL!, {
    method: 'POST',
    body: JSON.stringify(chatMessage),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // post process body
  const responseBody = (await response.json()) as any;
  console.log('Response body:', responseBody);
  const retMsgBody: MessageBody = {
    usermId: 1,
    role: responseBody.role,
    content: responseBody.content,
    datetime: new Date().getTime()
  }
  return retMsgBody;
}


