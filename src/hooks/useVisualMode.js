import { useState } from "react";

//take in an initial mode
const useVisualMode = function (initialMode) {
  //set the mode state with the initial mode provided
  const [mode, setMode] = useState(initialMode);

  //return an object with a mode property
  return { mode };
};

export default useVisualMode;
