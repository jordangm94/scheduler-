import React, { Fragment } from 'react'

import "components/Appointment/styles.scss"

import Header from "./Header";

import Empty from "./Empty";

import Show from "./Show";

import Form from './Form';

import Status from './Status';

import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"

//Object destructuring will allow use to use "mode" rather than useVisualMode.mode
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING)
  //The book interview function is passed to the appointment prop, because of it's axios call, it is considered a promise. 
  //So we tack on a .then with the transition show, this means that the transition show does not happen till the bookInterview promise/putrequest/setState resloves. 
  props.bookInterview(props.id, interview)
  .then(() => {transition(SHOW)})
}


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />
      )}
      {mode === CREATE && <Form onSave={save} onCancel={() => back()} interviewers={props.interviewers}/>}
      {mode === SAVING && <Status message= "Saving"/>}
    </article>
  )
}

//Important details about appointment component:
/*Here we are are introducing our terms and bringing in our functions from useVisualMode
We check if props.interview is truthy when passed to appointment. 

Let's say it is not truthy that will cause useVisualMde to set the mode to EMPTY. Bringing us to line
28. 

At this line we say, if mode is equal to empty, which it is, we render the Empty component and pass it an onAdd prop that
will allow us to add functionality to add buttn. 

To this on Add button we use our transition function and transition to CREATE which brings us to line 35. 

If mode === CREATE, which in this case it is, we load the FORM for someone to book appointment. 

In Form we add an onCancel proop that triggers the back function, which will set the mode back to previous mode in history. 
Meaning if user clicks cancel on form, we are reverted back to previous EMPTY Mode and then we jump back up to line 28 and rerender the
EMPTY component*/