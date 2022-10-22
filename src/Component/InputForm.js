import React from "react";

function InputForm() {
  return (
    <>
      <div className="input-container">
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
      </div>
      <div className="btn-container">
        <div>
          <button>N</button>
          <button>K</button>
          <button>T</button>
          <button>N</button>
          <button>R</button>
          <button>L</button>
        </div>
        <div>
          <button>S</button>
          <button>O</button>
          <button>A</button>
          <button>J</button>
          <button>N</button>
          <button>U</button>
        </div>
      </div>
    </>
  );
}

export default InputForm;
