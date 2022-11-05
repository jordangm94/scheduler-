import { useState } from "react";

//Function to take in an initial mode
const useVisualMode = function(initialMode) {
  //set the mode state with the initial mode provided
  const [mode, setMode] = useState(initialMode);

  //Stateful array that stores history of modes
  const [history, setHistory] = useState([initialMode]);

  //Transition function to take in newMode and set mode state to newMode
  const transition = function(newMode) {
    setMode(newMode)
  }

  //Back function that allows for mode to be set back to previous mode in history array. Uses if conditional to ensure history.length to ensure that we are never backing past the fist value in array. 

  //Needs to use setHistory as well in order for place in history to be remembered, that way if we call back again it will bring us back a spot from our current position, not the initial position. 
  const back = function() {
    if (history.length === 1) return 
    setMode(history[history.length - 2])
    setHistory(history.pop)
  }

  //return an object with a mode property and transition function
  return { mode, transition, back };
};

export default useVisualMode;
