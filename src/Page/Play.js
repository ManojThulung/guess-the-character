import React, { useEffect, useRef, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import InputForm from "../Component/InputForm";

import { useLevel, useNewLevel } from "../Component/ScoreContext";

import Naruto from "../assets/images/naruto.jpg";
import Goku from "../assets/images/goku.jpg";
import Nezuko from "../assets/images/nezuko.jpg";
import Luffy from "../assets/images/luffy.jpg";
import Mikasa from "../assets/images/mikasa.jpg";
import Saitama from "../assets/images/saitama.jpg";
import Mob from "../assets/images/mob.jpg";
import Itachi from "../assets/images/itachi.jpg";
import Ichigo from "../assets/images/ichigo.jpg";
import Gintoki from "../assets/images/gintoki.jpg";
import Violet from "../assets/images/violet.jpg";

const LEVELS = [
  {
    level: 1,
    name: "naruto",
    buttons: "ANROYUBTLP",
    image: Naruto,
  },
  {
    level: 2,
    name: "goku",
    buttons: "VGOLSUK",
    image: Goku,
  },
  {
    level: 3,
    name: "nezuko",
    buttons: "PNTEEZUOK",
    image: Nezuko,
  },
  {
    level: 4,
    name: "luffy",
    buttons: "LYONFFGU",
    image: Luffy,
  },
  {
    level: 5,
    name: "mikasa",
    buttons: "KACASATMI",
    image: Mikasa,
  },
  {
    level: 6,
    name: "saitama",
    buttons: "AHSIMARITMA",
    image: Saitama,
  },
  {
    level: 7,
    name: "mob",
    buttons: "BOBMAR",
    image: Mob,
  },
  {
    level: 8,
    name: "itachi",
    buttons: "ITJUCAIHAR",
    image: Itachi,
  },
  {
    level: 9,
    name: "ichigo",
    buttons: "MAINCVHYIOG",
    image: Ichigo,
  },
  {
    level: 10,
    name: "gintoki",
    buttons: "GIRROBKNTI",
    image: Gintoki,
  },
  {
    level: 11,
    name: "violet",
    buttons: "PVIOOLNAERT",
    image: Violet,
  },
];

function Play() {
  const [levelComplete, setLevelComplete] = useState(false);
  const [levelState, setLevelState] = useState(0);
  const imageCoverRef = useRef();
  const imageRef = useRef();
  const { level, point } = useLevel();
  const newLevel = useNewLevel();
  // let currentLevel = level;

  useEffect(() => {
    setLevelComplete((prevLevelComplete) => (prevLevelComplete = false));
    localStorage.setItem("level", JSON.stringify(level));
    localStorage.setItem("point", JSON.stringify(point));
    // function to move next level
  }, [levelState, level, point]);

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
    newLevel();
  };

  //to zoom out image
  const getLevelStatus = (isLevel) => {
    setLevelComplete((prevLevelComplete) => (prevLevelComplete = isLevel));
  };

  return (
    <div className="play-page">
      <div className="header">
        <div className="level">
          Level: <span className="level-num">{LEVELS[levelState].level}</span>
        </div>
        <div className="score">
          Points: <span className="score-num">{point}</span>
        </div>
      </div>
      <div className="image-sec" ref={imageCoverRef}>
        <img
          src={LEVELS[levelState].image}
          ref={imageRef}
          alt="Character"
          style={{ transform: levelComplete ? "scale(1)" : "scale(5)" }}
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
