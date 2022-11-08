import React, { Fragment } from 'react'

import "components/Appointment/styles.scss"

import Header from "./Header";

import Empty from "./Empty";

import Show from "./Show";

import Form from './Form';

import Status from './Status';

import useVisualMode from 'hooks/useVisualMode';

import Confirm from './Confirm';

import Error from './Error';

export default function Appointment(props) {
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING ="DELETING";
const CONFIRM ="CONFIRM";
const EDIT ="EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

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
  .catch(response => transition(ERROR_SAVE, true))
}

//This function is passed to the show component so that when an individual clicks the delete button, it is triggered. 
function cancel() {
  transition(DELETING, true)
  props.cancelInterview(props.id)
  .then(() => {transition(EMPTY)})
  .catch(response => transition(ERROR_DELETE, true))
}

//Note for our show component, we allow for our onDelete, trash button, to transition us to Confirm component. 
//From there we decide on line 66 whether we execute cancel and delete of appointment or go back to show.
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
       student={props.interview.student}
       interviewer={props.interview.interviewer}
       onDelete={() => {transition(CONFIRM)}}
       onEdit={() => {transition(EDIT)}}
      />
      )}
      {mode === CREATE && <Form 
        onSave={save} 
        onCancel={() => back()} 
        interviewers={props.interviewers}
      />}
      {mode === SAVING && <Status message= "Saving"/>}
      {mode === DELETING && <Status message= "Deleting"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete your appointment?" onCancel={() => back()} onConfirm={cancel}/>}
      {mode === EDIT && <Form 
        onSave={save} 
        onCancel={() => back()} 
        interviewers={props.interviewers}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
      />}
      {mode === ERROR_SAVE && <Error onClose={() => {back()}} message= "Unable to create an appointment, please try again."/>}
      {mode === ERROR_DELETE && <Error onClose={() => {back()}} message= "Unable to delete the appointment, please try again."/>}
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