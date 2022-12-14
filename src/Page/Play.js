import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link } from "react-router-dom";
import InputForm from "../Component/InputForm";
// import LevelCompleteModel from "../Component/LevelCompleteModel";

import {
  useLevel,
  useChangeLevel,
  useContinue,
  useChangeContinue,
} from "../Component/ScoreContext";

import { LEVELS } from "../assets/data/data";

function Play() {
  const [levelState, setLevelState] = useState(0);
  const handleHintRef = useRef(); //to call function from its child component
  const { level, point } = useLevel();
  const { newLevel, decreasePoint } = useChangeLevel(); //to change level and points.
  const isContinue = useContinue();
  const changeContinue = useChangeContinue();
  // const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("level", JSON.stringify(level));
    localStorage.setItem("point", JSON.stringify(point));

    //prevent points add from previous level.
    if (isContinue) {
      setLevelState((prevLevelState) => (prevLevelState = level - 1));
    }
  }, [levelState, level, point, isContinue]);

  const onClickHint = () => {
    if (point >= 5) {
      handleHintRef.current.handleHint();
      decreasePoint();
    }
  };

  // function to move next level
  const nextLevelHandler = useCallback(() => {
    newLevel(LEVELS[levelState].level);
    setLevelState((prevLevelState) => prevLevelState + 1);
  }, []);

  //to move level back
  const handleBackLevel = () => {
    if (levelState >= 1) {
      setLevelState((prevLevelState) => prevLevelState - 1);
    }
  };

  // //to hide modal box
  // const handleModal = (state) => {
  //   setIsModal((prevIsModal) => (prevIsModal = state));
  // };

  return (
    <div className="play-page">
      <div className="header">
        <div className="level">
          Level: <span className="level-num"> {LEVELS[levelState].level}</span>
          <span className="btn-back-container">
            <IoChevronBackCircleOutline
              className="btn-back-icon"
              onClick={handleBackLevel}
            />
          </span>
        </div>
        <div className="score">
          <span onClick={onClickHint} className="btn-hint-container">
            <HiOutlineLightBulb className="btn-hint-icon" />
            <span className="point-minus">{Math.trunc(point / 5)}</span>
          </span>
          Points: <span className="score-num">{point}</span>
        </div>
      </div>
      <div className="input-form">
        <InputForm
          nextLevelHandler={nextLevelHandler}
          levels={LEVELS}
          levelState={levelState}
          ref={handleHintRef}
        />
      </div>
      <div className="homepage-btn-container">
        <Link to="/">
          <button onClick={changeContinue(false)} className="btn-home-page">
            Home Page
          </button>
        </Link>
      </div>
      {/* <LevelCompleteModel
        isModal={isModal}
        handleModal={handleModal}
        changeContinue={changeContinue(false)}
      /> */}
    </div>
  );
}

export default Play;
