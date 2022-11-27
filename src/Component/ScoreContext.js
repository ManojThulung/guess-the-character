import { createContext, useContext, useState } from "react";

const LevelContext = createContext();
const ChangeLevelContext = createContext();

export function useLevel() {
  return useContext(LevelContext);
}

export function useChangeLevel() {
  return useContext(ChangeLevelContext);
}

function LevelProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [point, setPoint] = useState(0);

  const newLevel = (currentLevel) => {
    setLevel((prevLevel) => {
      if (currentLevel >= prevLevel) {
        setPoint((prevPoint) => prevPoint + 2);
        return prevLevel + 1;
      } else {
        return prevLevel;
      }
    });
  };

  return (
    <LevelContext.Provider value={{ level, point }}>
      <ChangeLevelContext.Provider value={newLevel}>
        {children}
      </ChangeLevelContext.Provider>
    </LevelContext.Provider>
  );
}

export default LevelProvider;
