import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";

import Button from "components/Button";

//The bottom of this document contains notes for various instances of this Form. 

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = function () {
    reset()
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={() => props.onSave(student, interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

//For our create state we are passing the array of interviewers through props.interviewers
//and assigning it a prop name of interviewers. This way it can pass correct info from interviewers array
//into sub interviwerListItem. As well as on click event handling for save and cancel buttons.

//We also incorporate a value and assign that value to props.student, which will be the student information that is passed in.
//Important note, the edit form story does not show the hard coded Jordan Guerrero student value because student is not passed as a prop
//in the edit story.

//Further note, you need to pass interviewers and interviewer and onChange
//to the InterviewerList with the exact prop names as that is what InterviewerList needs as props.
//Refer to InterviewerList.js component!

//For the state, we provide default state of props.student from story code. If an individual starts typing, that will
//be in the input element, where an onChange first and triggers set student function. This set student function will take user input,
//set it as default (which is saved in student), and then that new default value saved in student is passed to value of input.

//For the interviewerlist component we are passing interviewers, which is an object with all interviewers. Onchange we are
//making equivalent to setInterviewer, so that when new interviewer is selected "on a change" we set that new interviewer
//as the default "interviewer", which that id will now appear in value={interviewer} and will be passed accordingly to Interviewer List. 

//Also created a reset function that will reset the form information when the cancel button is clicked. 
//We put this reset function inside a cancel function that will call a function called props.oncancel,
//at the current moment props.onCancel doesn't do anything in the future it will. 

//We tie this cancel function to the cancel button onClick so that it triggers and resets form and call onCancel function
//when cancel button is clicked. 

//Lasly, we do not want the submit button to fire a request or "submit" when user clicks enter, which is 
//it's default value. Hence we add a prevent default on submit in the form element.

//Extremely crucial note, for the on save button within the form, in order to save the name of the student and interviewer,
//you must put it in an anonymous function. This is because you are passing params to onSave. If you do not, 
//it calls every time the page re-renders, which is every time the state changes. 