import React from "react";
import { useRef } from "react";

function InputForm(props) {
  const inputRef = useRef();
  const inputContainerRef = useRef();

  const onClickHandler = (e) => {
    const value = e.target.value;

    // console.log(inputContainerRef.current.firstChild);
    inputContainerRef.current.map((value) => console.log(value));
    // console.log(inputRef.current);
    inputRef.current.value = value;
  };

  return (
    <>
      <div className="input-container" ref={inputContainerRef}>
        <input type="text" disabled ref={inputRef} />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
      </div>
      <div className="btn-container">
        <div>
          <button onClick={onClickHandler} value="N">
            N
          </button>
          <button onClick={onClickHandler} value="K">
            K
          </button>
          <button>T</button>
          <button>N</button>
          <button>R</button>
          <button>U</button>
        </div>
        <div>
          <button>S</button>
          <button>O</button>
          <button>A</button>
          <button>J</button>
          <button>N</button>
          <button className="delete-icon">{props.deleteIcon}</button>
        </div>
      </div>
    </>
  );
}

export default InputForm;
