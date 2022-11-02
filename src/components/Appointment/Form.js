import React from "react";

import InterviewerList from "components/InterviewerList";

import Button from "components/Button";

  //For our create state we are passing the array of interviewers through props.interviewers 
  //and assigning it a prop name of interviewers. This way it can pass correct info from interviewers array
  //into sub interviwerListItem. As well as on click event handling for save and cancel buttons. 

  //We also incorporate a value and assign that value to props.student, which will be the student information that is passed in. 
export default function Form(props) {
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name='name'
        type="text"
        placeholder="Enter Student Name"
        value={props.student}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      // onChange={props.onChange}
      value={props.interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={props.onSave} confirm>Save</Button>
    </section>
  </section>
</main>
  );
}