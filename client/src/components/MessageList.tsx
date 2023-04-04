import {MessageBody} from "../api/types";

type Props = {
  msgs: MessageBody[];
};
export function MessageList({ msgs }: Props) {

  return (
    <ul className="list-none">
      {msgs.map((msgBody) => (
        <li key={msgBody.datetime} className="border-b py-4">
          <h3 className="text-slate-900 font-bold">{msgBody.role}</h3>
          <p className=" text-slate-900 ">{msgBody.content}</p>
        </li>
      ))}
    </ul>
  );
}
