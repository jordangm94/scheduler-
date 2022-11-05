import { useState } from "react";

//Function to take in an initial mode
const useVisualMode = function(initialMode) {
  //set the mode state with the initial mode provided
  const [mode, setMode] = useState(initialMode);

  //Transition function to take in newMode and set mode state to newMode
  const transition = function(newMode) {
    setMode(newMode)
  }

  //return an object with a mode property and transition function
  return { mode, transition };
};

export default useVisualMode;
