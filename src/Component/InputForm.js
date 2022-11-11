import React from "react";
import { useRef } from "react";

function InputForm(props) {
  const inputContainerRef = useRef();
  let counter = 0;

  const onClickHandler = (e) => {
    //to prevent from getting undifined value from outside of buttons
    if (e.target.value) {
      const value = e.target.value; //get a letter value from clicked button.

      //to get the total numbers of letter of the name.
      const inputList = inputContainerRef.current.children;
      const inputListLength = inputList.length;

      if (counter < inputListLength) {
        inputList[counter].value = value; //set letter value in the empty input.
        counter = counter + 1;
      } else {
        console.log("end");
      }
    }
  };

  return (
    <>
      <div className="input-container" ref={inputContainerRef}>
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
        <input type="text" disabled />
      </div>
      <div onClick={onClickHandler} className="btn-container">
        <button value="N">N</button>
        <button value="K">K</button>
        <button value="T">T</button>
        <button value="N">N</button>
        <button value="R">R</button>
        <button value="U">U</button>
        <button value="S">S</button>
        <button value="O">O</button>
        <button value="A">A</button>
        <button value="J">J</button>
        <button value="N">N</button>
        <span className="delete-icon">{props.deleteIcon}</span>
      </div>
    </>
  );
}

export default InputForm;
