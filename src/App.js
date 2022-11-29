import "./App.css";
import { Route, Routes } from "react-router-dom";
import StateProvider from "./Component/ScoreContext";
import Home from "./Page/Home";
import Play from "./Page/Play";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </StateProvider>
    </div>
  );
}

export default App;
