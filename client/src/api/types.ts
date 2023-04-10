// unified format for chatting message send and recv
export type MessageBody = {
  username: string;
  role: string;
  content: string;
  datetime: number;
  sessionId: string;
}

export function assertIsMessageBody(msg: any): asserts msg is MessageBody {
  /*
  if (!Array.isArray(postsData)) {
    throw new Error("components isn't an array");
  }
  if (postsData.length === 0) {
    return;
  }
  */
  if (typeof msg !== 'object' || msg === null) {
    throw new Error('msg must be a non-null object');
  }

  if (typeof msg.username !== 'string') {
    throw new Error('username must be a string');
  }

  if (typeof msg.role !== 'string') {
    throw new Error('role must be a string');
  }

  if (typeof msg.content !== 'string') {
    throw new Error('content must be a string');
  }

  if (typeof msg.datetime !== 'number') {
    throw new Error('datetime must be a number');
  }

  if (typeof msg.sessionId !== 'string') {
    throw new Error('sessionId must be a string');
  }
}

