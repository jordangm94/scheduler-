import React from "react";

import DayListItem from "./DayListItem";

//What is going on in the component below, this DayList component will be responsible for showing multiple
//daylistitem components. We create a variable called listOfDays, and in there we map through the days array of objects
//passed to the DayList component in index.js as a prop. This map is basically a loop. 

//Then for each daylist item, we are providing it with various props, that will be used in the dayListItem component 
//such as name and spots, as you can see being used in the daylistitem.js file. 

//In the selected line we are checking to see if the the name of the day in the object is equal to the hardcoded day
//passed to DayList. Once there is a match, that allows for the selected css styles determined in DayListItem to be applied
//to our selected item on screen. 

//We store all of these daylistItem components in a variable called listOfDays, and then call upon that variable to list all
//of them in the return statement at the bottom. 

export default function DayList(props) {

  const listOfDays = props.days.map((daysObj) => {
    return (
      <DayListItem
      key = {daysObj.id}
      name = {daysObj.name}
      spots = {daysObj.spots}
      selected = {daysObj.name === props.day}
      setDay = {props.setDay}
      />
    )
  })
  
  return (
    <ul>
      {listOfDays}
    </ul>
  )
}