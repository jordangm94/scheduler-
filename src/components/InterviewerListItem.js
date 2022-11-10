import React from "react";

import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  //Here we use classNames library to create conditional class for HTML element. Class name will always be
  //interviewers__item but if selected in props passed down is truthy, then new css in key is applied.
  let interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': props.selected})

  //Pass this interviewerClass variable ino the list className so it applies, only when selected! 
  
  //Below implemented an on click event so that when the container is clicked, the set interviewer function called
  //on props.id. This will have greater function near end when we deal with state! 
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  )
  //Above we replaced certain values such as id and avatar with what is passed by props to make more dynamic. 
}