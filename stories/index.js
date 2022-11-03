import React, { Fragment } from 'react'
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "index.scss";
import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList"

//Appointment imports
import Appointment from "components/Appointment/index.js"
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show"
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

//Personal Notes: What comes below is the equivalent to our App.js page in different assignments
//We are creatting various flavors of the same DayListItem, but will have each behave or style differently based on 
//what it is handling. In each of these dayListitems, we are passing props which we then call in our DayListItem .

//So we start with a story called DayListItem in storybook, and under that will be the different flavors of our button. 

storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} value={"Monday"} onChange={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
    ))
    .add("Wednesday", () => (
        <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
    ));
  
    //The following code is going to create stories for the InterviewerListItem and 
    //InterviewList

    const interviewer = {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };
    
    storiesOf("InterviewerListItem", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Unselected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        />
      ))
      .add("Selected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected
        />
      ))
      .add("Clickable", () => (
        <InterviewerListItem
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={() => action("setInterviewer")(interviewer.id)}
        />
      ));

//Stories for InterviewerList component: 

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ));

  //The following stories will be for Appointments and all of it's child components: 

  //Note in order to add a functioon to a story to pass down, must pass function as prop and use word action
  //with name of function as a string within action. 

  storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12PM"/>)
  .add("Header", () => <Header time="12PM"/>)
  .add("Empty", () => <Empty onAdd={action("onAdd")}/>)
  .add("Show", () => <Show student="Lydia Miller-Jones" interviewer={interviewer} onEdit={action("onEdit")} onDelete={action("onDelete")} />)
  .add("Confirm", () => <Confirm message="Delete the appointment" onConfirm={action("onConfirm")} onCancel={action("onCancel")}/>)
  .add("Status", () => <Status message="Deleting"/>)
  .add("Error", () => <Error message="Could not delete appointment." onClose={action("onClose")}/>)
  .add("Create", () => <Form interviewers={interviewers} onSave={action("onSave")} onCancel={action("onCancel")} />)
  .add("Edit", () => <Form student="Jordan Guerrero" interviewers={interviewers} interviewer={3} onSave={action("onSave")} onCancel={action("onCancel")} />)
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment time="5pm" />
    </Fragment>
  ))