import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

import PropTypes from 'prop-types';

//This component is receiving the interviewers Array as a prop, this is an array of Interviewer objects. 
export default function InterviewerList(props) {

  //Next we will loop through the array using the .map function and gain access to each individual obj in array. 
  const listOfInterviewers = props.interviewers.map((interviewerObj) => {
    return (
      /* Next, all the necessities we got from our props through interviewersObj, we are going to pass into
      each InterviewerListItem, allowing us to populate multiple list item components with the correct information
      Note: selected at the current moment is hard coded where interviwer object id is equal to props.interviewer currently
      passed as number 3 to InterviewerList in props, this will be changed later! */
      <InterviewerListItem
      key = {interviewerObj.id}
      name = {interviewerObj.name}
      avatar = {interviewerObj.avatar}
      selected = {interviewerObj.id === props.value}
      setInterviewer = {() => props.onChange(interviewerObj.id)}
      />
      //Note all of these InterviewerListItem components and what they are populated with thanks to passed props, is stored in
      //listOfInterviewers variable. Next we will now incorporate this vairable into HTML to display list. 
    )
  })

  return (
    //Lastly, we will include t
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listOfInterviewers}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}