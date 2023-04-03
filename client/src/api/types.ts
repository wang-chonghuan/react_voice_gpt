import exp from "constants";

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

export type MessageSend = {
  usermId: number;
  message: {
    role: string;
    content: string;
  };
};

export type MessageBody = {
  usermId: number;
  role: string;
  content: string;
  datetime: string;
}

export type ChatHistory = {
  messages: MessageBody[];
};
