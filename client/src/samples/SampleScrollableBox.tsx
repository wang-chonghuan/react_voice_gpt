import React from "react";

const ScrollableBox: React.FC = () => {
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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">Header</header>

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
      <footer className="bg-gray-800 text-white p-4">Footer</footer>
    </div>
  );
};

export default ScrollableBox;
