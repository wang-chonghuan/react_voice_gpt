import { useEffect, useState } from 'react';
import { getPosts } from '../api/getPosts';
import { PostData, NewPostData } from '../api/types';
import { MessageList } from './MessageList';
import { savePost } from '../api/savePost';
import { MessageForm } from './MessageForm';

export function ChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    let cancel = false;
    getPosts().then((data) => {
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
    const newPost = await savePost(newPostData);
    setPosts([...posts, newPost]);
  }
  if (isLoading) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }
  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 font-bold">KidsGPT</h2>
      <MessageForm onSave={handleSave} />
      <MessageList posts={posts} />
    </div>
  );
}
