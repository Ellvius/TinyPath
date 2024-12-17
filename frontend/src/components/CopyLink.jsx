import React, { useRef } from "react";

const CopyLink = ({shortUrl}) => {
  const contentRef = useRef();

  const copyToClipboard = () => {
    const content = contentRef.current.innerText;
    navigator.clipboard.writeText(content)
      .catch((err) => console.error("Failed to copy content", err));
  };

  return (
    <div className="flex justify-center">
      <div ref={contentRef} className="p-2 bg-white font-semibold">
        <p>{shortUrl}</p>
      </div>

      <button
        onClick={copyToClipboard}
        className="bg-primary text-secondary font-extrabold p-2 border-l border-secondary shadow-lg transform transition-transform active:scale-95 active:shadow-inner"
      >
        Copy
      </button>
    </div>
  );
};

export default CopyLink;
