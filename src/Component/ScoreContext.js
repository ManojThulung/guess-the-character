import { createContext, useContext, useState } from "react";

const LevelContext = createContext();
const ChangeLevelContext = createContext();
const ContinueContext = createContext();
const ChangeContinueContext = createContext();

export function useLevel() {
  return useContext(LevelContext);
}

export function useChangeLevel() {
  return useContext(ChangeLevelContext);
}

export function useContinue() {
  return useContext(ContinueContext);
}

export function useChangeContinue() {
  return useContext(ChangeContinueContext);
}

function StateProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [point, setPoint] = useState(15);
  const [isContinue, setIsContinue] = useState(false);

  // const newLevel = (currentLevel) => {
  //   setLevel((prevLevel) => {
  //     if (currentLevel >= prevLevel) {
  //       setPoint((prevPoint) => prevPoint + 2);
  //       return prevLevel + 1;
  //     } else {
  //       return prevLevel;
  //     }
  //   });
  // };

  const newLevel = (currentLevel) => {
    if (currentLevel >= level) {
      setLevel((prevLevel) => prevLevel + 1);
      setPoint((prevPoint) => prevPoint + 2);
    }
  };

  const decreasePoint = () => {
    setPoint((prevPoint) => prevPoint - 5);
  };

  const changeContinue = (state) => {
    setIsContinue((prevIsContinue) => (prevIsContinue = state));
  };

  return (
    <LevelContext.Provider value={{ level, point }}>
      <ChangeLevelContext.Provider value={{ newLevel, decreasePoint }}>
        <ContinueContext.Provider value={isContinue}>
          <ChangeContinueContext.Provider value={changeContinue}>
            {children}
          </ChangeContinueContext.Provider>
        </ContinueContext.Provider>
      </ChangeLevelContext.Provider>
    </LevelContext.Provider>
  );
}

export default StateProvider;
