import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {

  const formatSpots = function(propSpots) {
    //Note in this function we return no spots or 1 spot in order to tackle the pleuralization of word spot appropriately.
    if (props.spots === 0) {
      return "no spots";
    } else if (props.spots === 1) {
      return "1 spot";
    } else {
      return props.spots + " spots";
    }
  }
  //Conditional statements using classNames functions, base className is day-list__item, if props.selected or props.spots conditions 
  //are truthy, than other css is implemented. 
  let dayClass = classNames('day-list__item', {'day-list__item--selected': props.selected, 'day-list__item--full': props.spots === 0 ? true: false})

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}

//Note: for onClick, we need to apply setDay so that it resets the day to the name of the one we clicked on. 
//Since we need to pass props.name to the setDay function, we must put it in anonymous function in order for it to work
//in react.