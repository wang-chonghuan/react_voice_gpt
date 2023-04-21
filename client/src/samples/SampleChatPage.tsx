import React from "react";
import {MessageForm} from "../components/MessageForm";
import {HeaderBar} from "../components/HeaderBar";

const SampleChatPage: React.FC = () => {
  const fixedData = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10"
  ];

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <HeaderBar></HeaderBar>

      {/* Scrollable Box */}
      <div className="flex flex-col flex-grow overflow-y-auto p-4 bg-gray-200">
        {fixedData.map((item, index) => (
          <div
            key={index}
            className="p-4 m-2 bg-white rounded-md shadow-md"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Footer */}
      <MessageForm onSave={() => {}}></MessageForm>
    </div>
  );
};

export default SampleChatPage;
