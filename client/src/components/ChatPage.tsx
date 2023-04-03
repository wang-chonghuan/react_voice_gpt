import {useEffect, useState} from 'react';
import {getMessages} from '../api/getMessages';
import {PostData, NewPostData, ChatHistory} from '../api/types';
import {MessageList} from './MessageList';
import {sendMessage} from '../api/sendMessage';
import {MessageForm} from './MessageForm';

export function ChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory>({ messages: [] });

  useEffect(() => {
    let cancel = false;
    getMessages().then((data) => {
      if (!cancel) {
        setPosts(data);
        setIsLoading(false);
      }
    });
    return () => {
      cancel = true;
    };
  }, []);

  async function handleSave(newPostData: NewPostData) {
    const newPost = await sendMessage(newPostData);
    setPosts([...posts, newPost]);
  }

  if (isLoading) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }
  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 font-bold">GPT Client</h2>
      <MessageForm onSave={handleSave}/>
      <MessageList posts={posts}/>
    </div>
  );
}
