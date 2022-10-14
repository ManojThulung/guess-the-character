import "./App.css";
import Home from "./Page/Home";
import Play from "./Page/Play";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </div>
  );
}

export default App;
