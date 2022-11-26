import React from "react";
import { Link } from "react-router-dom";
import { useLevel } from "../Component/ScoreContext";

function Home() {
  const { level, point } = useLevel();

  return (
    <div className="home-page">
      <div className="header">
        <div className="level">
          Level: <span className="level-num">{level}</span>
        </div>
        <div className="score">
          Points: <span className="score-num">{point}</span>
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
