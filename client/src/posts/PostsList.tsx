import {PostData} from "./types";

type Props = {
  posts: PostData[];
};

export function PostsList({posts}: Props) {
  return (
    <ul className="list-node">{
      posts.map((post) => (
        <li key={post.id} className="border-b py-4">
          <h3 className="text-slate-900 font-bold">
            {post.name}
          </h3>
          <p className="text-slate-900">
            {post.message}
          </p>
        </li>
      ))
    }</ul>
  );
}
