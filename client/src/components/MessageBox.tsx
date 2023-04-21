import { MessageBody } from "../api/types";
import React from "react";

type Props = {
  msgs: MessageBody[];
};
export function MessageBox({ msgs }: Props) {

  const getBubbleStyle = (role: string) => {
    return role === "user" ? "chat chat-end" : "chat chat-start";
  };

  return (
    <div className="flex flex-col flex-grow overflow-y-auto p-4 bg-gray-100">
      {msgs.map((msgBody) => (
        <div key={msgBody.datetime}>
          <div className={getBubbleStyle(msgBody.role)}>
            <div className="chat-header">
              {msgBody.role}
            </div>
            <div className="chat-bubble">{msgBody.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
