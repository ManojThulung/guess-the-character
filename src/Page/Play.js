import React from "react";
import Image from "../assets/images/naruto.jpg";
import InputForm from "../Component/InputForm";

function Play() {
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
        <img src={Image} alt="Character" />
        {/* </div> */}
      </div>
      <div className="input-form">
        <InputForm />
      </div>
    </div>
  );
}

export default Play;
