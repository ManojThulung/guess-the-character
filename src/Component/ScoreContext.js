import { createContext, useContext, useState } from "react";

const LevelContext = createContext();
const NewLevelContext = createContext();

export function useLevel() {
  return useContext(LevelContext);
}

export function useNewLevel() {
  return useContext(NewLevelContext);
}

function LevelProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [point, setPoint] = useState(0);

  const newLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setPoint((prevPoint) => prevPoint + 2);
  };

  return (
    <LevelContext.Provider value={{ level, point }}>
      <NewLevelContext.Provider value={newLevel}>
        {children}
      </NewLevelContext.Provider>
    </LevelContext.Provider>
  );
}

export default LevelProvider;
