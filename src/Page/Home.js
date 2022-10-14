import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <div className="header">
        <div className="level">
          Level: <span className="level-num">01</span>
        </div>
        <div className="score">
          Score: <span className="score-num">00</span>
        </div>
      </div>
      <div className="hero-sec">
        <div className="title">
          <h2>Guess Character</h2>
        </div>
        <div className="btn-sec">
          <Link to="/play">
            <button className="btn btn-play">Play</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
