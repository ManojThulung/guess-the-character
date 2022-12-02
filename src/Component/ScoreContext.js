import { createContext, useContext, useState } from "react";

const LevelContext = createContext();
const ChangeLevelContext = createContext();
const ContinueContext = createContext();
const ChangeContinueContext = createContext();
const IsCompleteContext = createContext();

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

// export function useIsComplete() {
//   return useContext(IsCompleteContext);
// }

function StateProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [point, setPoint] = useState(15);
  const [isContinue, setIsContinue] = useState(false);
  // const [isComplete, setIsComplete] = useState(false);

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

  // const changeComplete = (isState) => {
  //   setIsComplete((prevIsComplete) => (prevIsComplete = isState));
  // };

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
            {/* <IsCompleteContext.Provider value={{ isComplete, changeComplete }}> */}
            {children}
            {/* </IsCompleteContext.Provider> */}
          </ChangeContinueContext.Provider>
        </ContinueContext.Provider>
      </ChangeLevelContext.Provider>
    </LevelContext.Provider>
  );
}

export default StateProvider;
