import React, { useState, useEffect } from "react";

import Axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

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

  //Trigger useEffect to make a request to /api/days using axios.get. Axios returns response in a promise and we update
  //the default days value by using setDays on the response.data(array of days objects)
  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments')
    ]).then((all) => {
      console.log(all[0].data.name)
      console.log(all[1].data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
    })
  }, [])
  
  //Note, we include an empty array as second argument for useEffect which tells it that we only run this api request once when the 
  //component renders. This empty array, or state passed to this array tells useEffect what to do. If not added, will continuosly be triggered. 
  

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const listOfAppointments = dailyAppointments.map((appointmentObj) => (
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
