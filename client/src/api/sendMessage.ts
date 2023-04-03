import { NewPostData, SavedPostData, MessageSend } from './types';

export async function sendMessage(newPostData: NewPostData) {
  newPostData.name = 'user';
  const chatMessage: MessageSend = {
    usermId: 1,
    message: {
      role: 'user',
      content: newPostData.message,
    },
  };
  console.log('Request body:', chatMessage);
  console.log('Request URL:', process.env.REACT_APP_MAIVC_URL!);
  const response = await fetch(process.env.REACT_APP_MAIVC_URL!, {
    method: 'POST',
    body: JSON.stringify(chatMessage),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseBody = (await response.json()) as unknown;
  console.log('Response body:', responseBody);
  //assertIsSavedPost(body);
  //return { ...newPostData, ...body };
  assertIsSavedPost(newPostData);
  return { ...newPostData};
}

function assertIsSavedPost(post: any): asserts post is SavedPostData {
  if (!('id' in post)) {
    throw new Error("post doesn't contain id");
  }
  if (typeof post.id !== 'number') {
    throw new Error('id is not a number');
  }
}
