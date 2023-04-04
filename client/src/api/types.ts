import exp from "constants";
/*
export type PostData = {
  id: number;
  name: string;
  message: string;
};

export type NewPostData = {
  name: string;
  message: string;
};

export type SavedPostData = {
  id: number;
};
*/
export type MessageSend = {
  usermId: number;
  message: {
    role: string;
    content: string;
  };
};

// unified format for chatting message send and recv
export type MessageBody = {
  usermId: number;
  role: string;
  content: string;
  datetime: number;
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

  if (typeof msg.usermId !== 'number') {
    throw new Error('usermId must be a number');
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
}

