import React from 'react'

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const listOfAppointments = dailyAppointments.map((appointmentObj) => {
    const interview = getInterview(state, appointmentObj.interview);
    return (
      <Appointment 
      key={appointmentObj.id}
      {...appointmentObj}
      interview={interview}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      //Note here we use the spread operator...For every loop/map over a new object it takes the keys of that object
      //and passes them as props same as the code below. More dynamic approach, allows appointment to be passed only the keys
      //it needs!
      
      // id={appointmentObj.id}
      // time={appointmentObj.time}
      // interview={appointmentObj.interview}

      //Further note: Here we used getInterviewersForDay function in order for it to properly acquire the correct interviewer data and
      //pass it dwn to Appointment --> Form --> InterviewerList --> InterviewerListItem
      />
    )
  })

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
        <Appointment cancelInterview={cancelInterview} bookInterview={bookInterview} key="last" time="5pm" />
      </section>
    </main>
  );
}
