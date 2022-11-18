import React, { useRef, useState } from "react";
import Image from "../assets/images/naruto.jpg";
import InputForm from "../Component/InputForm";

import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";

function Play() {
  const [levelComplete, setLevelComplete] = useState(false);
  const imageCoverRef = useRef();
  const imageRef = useRef();

  const getLevelStatus = (isLevel) => {
    setLevelComplete(isLevel);
  };

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
        {/* <div className="image-cover"> */}
        <img
          src={Image}
          ref={imageRef}
          alt="Character"
          style={{ transform: levelComplete ? "scale(1)" : "scale(15)" }}
        />
        {/* </div> */}
      </div>
      <div className="input-form">
        <InputForm
          shakeImage={shakeImage}
          getLevelStatus={getLevelStatus}
          deleteIcon={<FiDelete />}
        />
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
