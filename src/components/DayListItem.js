import React from "react";

//First attempt at creating the DayListItem
// export default function DayListItem(props) {
//   return (
//     <li>
//       <h2 className="text--regular" onClick={() => props.setDay(props.name)}>{props.name}</h2> 
//       <h3 className="text--light">{props.spots} spots remaining</h3>
//     </li>
//   );
// }

//Important note, our first attempt worked; however, must include on click in list html element, if include in h2, then
//we will only register the set day when we click the actual day name I.e. Tuesday, not when we click the whole container. 

  //Note: for onClick, we need to apply setDay so that it resets the day to the name of the one we clicked on. 
  //Since we need to pass props.name to the setDay function, we must put it in anonymous function in order for it to work
  //in react.
  
export default function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}