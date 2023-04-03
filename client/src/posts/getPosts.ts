import {PostData} from "./types";

export async function getPosts() {
  const response = await fetch(process.env.REACT_APP_API_URL!);
  const body = (await response.json()) as unknown;
  assertIsPosts(body);
  return body;
}

export function assertIsPosts(postsData: unknown): asserts postsData is PostData[] {
  if (!Array.isArray(postsData)) {
    throw new Error("posts isn't an array");
  }
  if (postsData.length === 0) {
    return;
  }
  postsData.forEach((post) => {
    if (!('id' in post)) {
      throw new Error('post doesnt contain id');
    }
    if (typeof post.id !== 'number') {
      throw new Error('id is not a number');
    }

    if (!('name' in post)) {
      throw new Error('post doesnt contain name');
    }
    if (typeof post.name !== 'string') {
      throw new Error('name is not a string');
    }

    if (!('message' in post)) {
      throw new Error('post doesnt contain message');
    }
    if (typeof post.message !== 'string') {
      throw new Error('message is not a string');
    }
  });
}
