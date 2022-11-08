import { useState } from "react";

//Function to take in an initial mode
const useVisualMode = function(initialMode) {
  //set the mode state with the initial mode provided
  const [mode, setMode] = useState(initialMode);

  //Stateful array that stores history of modes
  const [history, setHistory] = useState([initialMode]);

  //Transition function to take in newMode and set mode state to newMode, takes in optional replace argument as well. 
  const transition = function(newMode, replace = false) {
    //Store history in a variable, as we never want to manipulate history state directly. 

    //if replace is truthy, we are going to pop one value off of the end of history array, or in other words replace it with what is to follow, the newMode
    //These two lines set mode to new mode and add new mode to end of history state array, whether we replaced a value or not
    setMode(newMode)
    // setHistory([...currentHistory, newMode])
    // prev => ([...prev, mode])
    if (replace) {
      setHistory((prev) => {
        prev.pop()
        return [...prev, mode]
      })
    } else {
        setHistory(prev => ([...prev, mode]))
    }
  }

  //Back function that allows for mode to be set back to previous mode in history array. Uses if conditional to ensure history.length to ensure that we are never backing past the fist value in array. 

  //Needs to use setHistory as well in order for place in history to be remembered, that way if we call back again it will bring us back a spot from our current position, not the initial position. 
  const back = function() {
    if (history.length === 1) return 
    setMode(history[history.length - 2])
    setHistory(history.slice(0, history.length - 1))
  }

  //return an object with a mode property and transition function
  return { mode, transition, back };
};

export default useVisualMode;
