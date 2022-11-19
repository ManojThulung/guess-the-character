import React, { useEffect, useRef, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import InputForm from "../Component/InputForm";

import Naruto from "../assets/images/naruto.jpg";
import Goku from "../assets/images/goku.jpg";
import Nezuko from "../assets/images/nezuko.jpg";

const LEVELS = [
  {
    name: "naruto",
    buttons: "ANLSROYUBTLP",
    image: Naruto,
  },
  {
    name: "goku",
    buttons: "VGAOLSUK",
    image: Goku,
  },
  {
    name: "nezuko",
    buttons: "PNTEEZAUOKER",
    image: Nezuko,
  },
];

function Play() {
  const [levelComplete, setLevelComplete] = useState(false);
  const [levelState, setLevelState] = useState(0);
  const imageCoverRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    setLevelComplete((prevLevelComplete) => (prevLevelComplete = false));
    // function to move next level
  }, [levelState]);

  // function to flash red color when a guess is wrong.
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

  // function to move next level
  const nextLevelHandler = () => {
    setLevelState((prevLevelState) => prevLevelState + 1);
  };

  //to zoom out image
  const getLevelStatus = (isLevel) => {
    setLevelComplete((prevLevelComplete) => (prevLevelComplete = isLevel));
  };

  return (
    <div className="play-page">
      <div className="header">
        <div className="level">
          Level: <span className="level-num">01</span>
        </div>
        <div className="score">
          Score: <span className="score-num">00</span>
        </div>
      </div>
      <div className="image-sec" ref={imageCoverRef}>
        <img
          src={LEVELS[levelState].image}
          ref={imageRef}
          alt="Character"
          style={{ transform: levelComplete ? "scale(1)" : "scale(10)" }}
        />
      </div>
      {levelComplete && (
        <div className="char-name">{LEVELS[levelState].name}</div>
      )}
      <div className="input-form">
        {!levelComplete && (
          <InputForm
            shakeImage={shakeImage}
            getLevelStatus={getLevelStatus}
            deleteIcon={<FiDelete />}
            levels={LEVELS}
            levelState={levelState}
          />
        )}
      </div>
      <div className="homepage-btn-container">
        <div>
          {levelComplete && (
            <button className="btn-next-level" onClick={nextLevelHandler}>
              Next Level
            </button>
          )}
        </div>
        <Link to="/">
          <button className="btn-home-page">Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default Play;
