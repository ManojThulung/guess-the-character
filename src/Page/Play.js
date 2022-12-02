import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link } from "react-router-dom";
import InputForm from "../Component/InputForm";

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

  useEffect(() => {
    localStorage.setItem("level", JSON.stringify(level));
    localStorage.setItem("point", JSON.stringify(point));

    if (isContinue) {
      setLevelState((prevLevelState) => (prevLevelState = level - 1));
    }
  }, [levelState, level, point, isContinue]);

  const onClickHint = () => {
    if (point >= 5) {
      handleHintRef.current.handleHint();
      // decreasePoint();
    }
  };

  // function to move next level
  const nextLevelHandler = () => {
    setLevelState((prevLevelState) => prevLevelState + 1);
    newLevel(LEVELS[levelState].level);
  };

  //to move level back
  const handleBackLevel = () => {
    if (levelState >= 1) {
      setLevelState((prevLevelState) => prevLevelState - 1);
    }
  };

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
            <span className="point-minus">-5</span>
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
    </div>
  );
}

export default Play;
