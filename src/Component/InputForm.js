import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { FiDelete } from "react-icons/fi";
import { useChangeLevel } from "./ScoreContext";

function InputForm({ nextLevelHandler, levels, levelState }, ref) {
  const inputContainerRef = useRef();
  const imageCoverRef = useRef();
  const [levelComplete, setLevelComplete] = useState(false);
  const { newLevel, decreasePoint } = useChangeLevel(); //to change level and points.

  let counter = 0;
  let userInput = "";
  const imageRef = useRef();

  //to the function to its parent
  useImperativeHandle(ref, () => ({
    //function to give hint
    handleHint() {
      // decreasePoint();
      console.log("Hint function called");
      const correctName = levels[levelState].name.toUpperCase();
      const inputList = inputContainerRef.current.children;
      const inputListLength = inputList.length;

      let isCorrect = true;

      //check data with the answer.
      if (userInput === "") {
        addUserInput(inputList, correctName[counter]);
      } else {
        const userInputAry = userInput.split("");

        emptyTextFields();

        userInputAry.every((input) => {
          if (input === correctName[counter]) {
            inputList[counter].value = input;
            counter += 1;
            userInput += input;
            return true;
          } else {
            inputList[counter].value = correctName[counter];
            userInput += correctName[counter];
            counter += 1;
            isCorrect = false;
            return false;
          }
        });

        if (isCorrect) addUserInput(inputList, correctName[counter]);
        if (counter === inputListLength) checkName(correctName);
      }
    },
  }));

  const handleNextLevel = () => {
    nextLevelHandler();
    setLevelComplete((prevLevelComplete) => (prevLevelComplete = false));
  };

  const shakeImage = () => {
    let imgPosition = ["30px", "-30px", "30px", "-30px", "30px", "0px"];
    let timeout = 0;
    imgPosition.forEach((position) => {
      setTimeout(() => {
        imageCoverRef.current.style.transform = `translateX(${position})`;
        if (position === "30px") imageRef.current.style.opacity = "0.2";
        else imageRef.current.style.opacity = "10";
      }, (timeout += 120));
    });
  };

  //to zoom out image
  const getLevelStatus = (isLevel) => {
    setLevelComplete((prevLevelComplete) => (prevLevelComplete = isLevel));
  };

  const onClickHandler = (e) => {
    //to prevent from getting undifined value from outside of buttons
    if (e.target.value) {
      let correctName = levels[levelState].name;
      const value = e.target.value; //get a letter value from clicked button.

      //to get the total numbers of inputs.
      const inputList = inputContainerRef.current.children;
      const inputListLength = inputList.length;

      if (counter < inputListLength) {
        addUserInput(inputList, value);

        if (counter === inputListLength) {
          checkName(correctName);
        }
      } else {
        console.log("end");
      }
    }
  };

  //to add user input data in the textfield and in userInput varaible.
  const addUserInput = (inputList, value) => {
    inputList[counter].value = value; //set letter value in the empty input.
    userInput += value;
    counter += 1;
  };

  // check name correctness.
  const checkName = (correctName) => {
    if (userInput === correctName.toUpperCase()) {
      getLevelStatus(true); //function called from parent component
    } else {
      shakeImage();
    }
  };

  // to empty all the text fields.
  const emptyTextFields = () => {
    const inputList = inputContainerRef.current.children;
    let i = 0;
    while (i <= counter) {
      inputList[i].value = "";
      i += 1;
      if (i === counter) {
        counter = 0;
        userInput = "";
      }
    }
  };

  //to remove letter from text feild.
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
      <div className="image-sec" ref={imageCoverRef}>
        <img
          src={levels[levelState].image}
          ref={imageRef}
          alt="Character"
          style={{ transform: levelComplete ? "scale(1)" : "scale(5)" }}
        />
      </div>
      {levelComplete && (
        <div className="char-name">{levels[levelState].name}</div>
      )}
      {!levelComplete && (
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
              <FiDelete />
            </span>
          </div>{" "}
        </>
      )}
      {levelComplete && (
        <div className="homepage-btn-container">
          <button className="btn-next-level" onClick={handleNextLevel}>
            Next Level
          </button>
        </div>
      )}
    </>
  );
}

export default forwardRef(InputForm);
