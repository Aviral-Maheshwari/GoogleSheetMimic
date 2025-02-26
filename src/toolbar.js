import React from "react";

const Toolbar = ({
  onBold,
  onItalic,
  onUnderline,
  onInsertFunction,
  isBoldActive,
  isItalicActive,
  isUnderlineActive,
}) => {
  return (
    <div className="toolbar">
      <button
        onClick={onBold}
        style={{ fontWeight: isBoldActive ? "bold" : "normal" }}
      >
        B
      </button>
      <button
        onClick={onItalic}
        style={{ fontStyle: isItalicActive ? "italic" : "normal" }}
      >
        I
      </button>
      <button
        onClick={onUnderline}
        style={{
          textDecoration: isUnderlineActive ? "underline" : "none",
        }}
      >
        U
      </button>
      <button onClick={onInsertFunction}>Insert Function</button>
    </div>
  );
};

export default Toolbar;
