import React, { useState, useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  minHeight?: string;
  maxHeight?: string;
};

const AutoResizeTextarea: React.FC<Props> = ({
                                               value,
                                               onChange,
                                               minHeight = "20",
                                               maxHeight = "200",
                                             }) => {
  const [height, setHeight] = useState<string>(minHeight);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = minHeight + "px";
      const newHeight =
        Math.min(textareaRef.current.scrollHeight, parseInt(maxHeight)) + "px";
      setHeight(newHeight);
    }
  }, [value, minHeight, maxHeight]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ height, minHeight: minHeight + "px" }}
      className="resize-none overflow-auto border border-gray-300 rounded-md p-2"
    />
  );
};

export default AutoResizeTextarea;
