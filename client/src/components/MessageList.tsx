import { MessageBody } from "../api/types";

type Props = {
  msgs: MessageBody[];
};
export function MessageList({ msgs }: Props) {

  const getListItemStyle = (role: string) => {
    return role === "user"
      ? "bg-gray-100 text-black" // 使用淡灰色背景和黑色文字
      : role === "assistant"
        ? "bg-white text-black"
        : "";
  };

  return (
    <ul className="list-none">
      {msgs.map((msgBody) => (
        <li
          key={msgBody.datetime}
          className={`border-b py-4 ${getListItemStyle(msgBody.role)}`}
        >
          <h3 className="text-slate-900 font-bold">{msgBody.role}</h3>
          <p className=" text-slate-900 ">{msgBody.content}</p>
        </li>
      ))}
    </ul>
  );
}
