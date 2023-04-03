import {ChatHistory, PostData} from '../api/types';
import {useState} from "react";

type Props = {
  posts: PostData[];
};
export function MessageList({ posts }: Props) {

  const reversedPosts = [...posts].reverse();

  return (
    <ul className="list-none">
      {reversedPosts.map((post) => (
        <li key={post.id} className="border-b py-4">
          <h3 className="text-slate-900 font-bold">{post.name}</h3>
          <p className=" text-slate-900 ">{post.message}</p>
        </li>
      ))}
    </ul>
  );
}
