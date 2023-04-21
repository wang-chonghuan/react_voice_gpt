import React, {ChangeEvent, useState} from "react";

export function ChatApp() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      setMessages([...messages, inputMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="chat chat-start">
        <div className="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">You underestimate my power!</div>
      </div>
      <form
        className="flex bg-white border-t-2 border-gray-300 p-4"
        onSubmit={handleSendMessage}
      >
        <input
          className="flex-1 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-green-500"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md ml-4"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
