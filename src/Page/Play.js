import React, { useState } from "react";
import Image from "../assets/images/naruto.jpg";
import InputForm from "../Component/InputForm";

import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";

function Play() {
  const [levelComplete, setLevelComplete] = useState(false);

  const getLevelStatus = (isLevel) => {
    setLevelComplete(isLevel);
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
      <div className="image-sec">
        {/* <div className="image-cover"> */}
        <img
          src={Image}
          alt="Character"
          style={{ transform: levelComplete ? "scale(1)" : "scale(15)" }}
        />
        {/* </div> */}
      </div>
      <div className="input-form">
        <InputForm getLevelStatus={getLevelStatus} deleteIcon={<FiDelete />} />
      </div>
      <div className="homepage-btn-container">
        <div>
          {levelComplete && (
            <button className="btn-next-level">Next Level</button>
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
