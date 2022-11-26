import "./App.css";
import { Route, Routes } from "react-router-dom";
import LevelProvider from "./Component/ScoreContext";
import Home from "./Page/Home";
import Play from "./Page/Play";

function App() {
  return (
    <div className="App">
      <LevelProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </LevelProvider>
    </div>
  );
}

export default App;
