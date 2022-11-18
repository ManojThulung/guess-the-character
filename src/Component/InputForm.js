import React from "react";
import { useRef } from "react";

function InputForm({
  getLevelStatus,
  shakeImage,
  deleteIcon,
  levels,
  levelState,
}) {
  const inputContainerRef = useRef();
  let counter = 0;
  let userInput = "";

  const onClickHandler = (e) => {
    //to prevent from getting undifined value from outside of buttons
    if (e.target.value) {
      let correctName = levels[levelState].name;
      const value = e.target.value; //get a letter value from clicked button.

      //to get the total numbers of inputs.
      const inputList = inputContainerRef.current.children;
      const inputListLength = inputList.length;

      if (counter < inputListLength) {
        inputList[counter].value = value; //set letter value in the empty input.
        userInput += value;
        counter += 1;

        if (counter === inputListLength) {
          if (userInput === correctName.toUpperCase()) {
            getLevelStatus(true); //function called from parent component
          } else {
            shakeImage();
          }
        }
      } else {
        console.log("end");
      }
    }
  };

  const onDeleteHandler = () => {
    if (counter >= 1) {
      const inputList = inputContainerRef.current.children;
      inputList[counter - 1].value = ""; //empty the least filled textfield.
      userInput = userInput.slice(0, -1);
      counter -= 1;
    }
  };

  return (
    <>
      <div className="input-container" ref={inputContainerRef}>
        {[...levels[levelState].name].map((input) => (
          <input type="text" disabled value="" />
        ))}
      </div>
      <div onClick={onClickHandler} className="btn-container">
        {[...levels[levelState].buttons].map((btn) => (
          <button value={btn}>{btn}</button>
        ))}
      </div>
      <div className="delete-btn-container">
        <span onClick={onDeleteHandler} className="delete-icon">
          {deleteIcon}
        </span>
      </div>
    </>
  );
}

export default InputForm;
