import { forwardRef, useImperativeHandle, useRef } from "react";

function InputForm(
  { getLevelStatus, shakeImage, deleteIcon, levels, levelState },
  ref
) {
  const inputContainerRef = useRef();
  let counter = 0;
  let userInput = "";

  //function to give hint
  useImperativeHandle(ref, () => ({
    handleHint() {
      const correctName = levels[levelState].name.toUpperCase();
      const inputList = inputContainerRef.current.children;

      //check data with the answer.
      if (userInput === "") {
        userInput += correctName[counter];
        inputList[counter].value = correctName[counter];
        counter += 1;
      } else {
        const userInputAry = userInput.split("");
        console.log(userInputAry);

        emptyTextFields();
        // counter = 0;
        console.log("counter ", counter);

        userInputAry.every((input) => {
          console.log("inside loop counter ", counter);
          if (input === correctName[counter]) {
            console.log("correct name ", correctName[counter]);
            console.log("match ", input);
            inputList[counter].value = input;
            counter += 1;
            userInput += input;
            return true;
          } else {
            console.log("unmatch", correctName[counter]);
            inputList[counter].value = correctName[counter];
            userInput += userInput[counter];
            counter += 1;
            return false;
          }
        });
        // userInputAry.every((input) => {
        //   if (input === userInput[counter]) {
        //     inputList[counter].value = correctName[counter];
        //     counter += 1;
        //     userInput += input;
        //     return true;
        //   } else {
        //     counter += 1;
        //     inputList[counter].value = correctName[counter];
        //     userInput += userInput[counter];
        //     return false;
        //   }
        // });
      }
    },
  }));

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

  const emptyTextFields = () => {
    const inputList = inputContainerRef.current.children;
    let i = 0;
    while (i <= counter) {
      inputList[i].value = "";
      i += 1;
      if (i === counter) {
        counter = 0;
        // userInput = "";
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
      <div onClick={emptyTextFields}>hey</div>
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

export default forwardRef(InputForm);
