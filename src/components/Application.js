import React, { useState, useEffect } from "react";

import Axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {

  //Refactored states and placed all state in Applicatin component within a single object.
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  //Function to setDay individually using setState. 
  const setDay = day => setState({ ...state, day });

  //Function to setDays individually using setState
  //Note here we must use prev to ensure that The action used to set the state still gets the previous state to ensure that only the days value changes.
  const setDays = (days) => {setState(prev => ({ ...prev, days }))}


  //Trigger useEffect to make a request to /api/days using axios.get. Axios returns response in a promise and we update
  //the default days value by using setDays on the response.data(array of days objects)
  useEffect(() => {
    Axios.get('/api/days')
    .then(response => {setDays(response.data)
      // How to set state with new format | setState({...state, day: 'Tuesday'})// setDays([...response.data])
      // setState({...state})// setDays([...response.data])
    });
    //Note, we include an empty array as second argument for useEffect which tells it that we only run this api request once when the 
    //component renders. This empty array, or state passed to this array tells useEffect what to do. If not added, will continuosly be triggered. 
  }, [])

  //With setDays updating our default days state, we will see that change on page within DayList Component that uses the days state

  const listOfAppointments = Object.values(appointments).map((appointmentObj) => (
    <Appointment 
    key={appointmentObj.id}
    {...appointmentObj}
    //Note here we use the spread operator...For every loop/map over a new object it takes the keys of that object
    //and passes them as props same as the code below. More dynamic approach, allows appointment to be passed only the keys
    //it needs!
    
    // id={appointmentObj.id}
    // time={appointmentObj.time}
    // interview={appointmentObj.interview}
    />
  ))


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listOfAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
