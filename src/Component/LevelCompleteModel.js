import { Link } from "react-router-dom";
import Trophy from "../assets/images/img/trophy.jpg";
import { ImCross } from "react-icons/im";

function LevelCompleteModel({ isModal, handleModal }) {
  return (
    <div className="modal" style={{ display: isModal ? "block" : "none" }}>
      <div className="header">
        <ImCross className="cross-icon" onClick={() => handleModal(false)} />
      </div>
      <div className="hero-sec">
        <div className="img-sec">
          <img src={Trophy} alt="trophy" />
        </div>
        <p className="main-text">CONGRATULATIONS</p>
        <p>
          You have completed all Levels and officially earned the{" "}
          <span>Otaku Title</span>
        </p>
        <Link to="/">
          <button className="btn-home-page">Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default LevelCompleteModel;
