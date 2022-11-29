import React from "react";
import { Link } from "react-router-dom";
import {
  useLevel,
  useContinue,
  useChangeContinue,
} from "../Component/ScoreContext";

function Home() {
  const { level, point } = useLevel();
  const isContinue = useContinue();
  const changeContinue = useChangeContinue();

  console.log(isContinue);

  function handleContinue() {
    changeContinue(true);
  }

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
          <div>
            <Link to="/play">
              <button onClick={changeContinue(false)} className="btn btn-play">
                New Game
              </button>
            </Link>
          </div>
          <div>
            {level > 1 && (
              <Link to="/play">
                <button onClick={handleContinue} className="btn btn-continue">
                  Continue
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
