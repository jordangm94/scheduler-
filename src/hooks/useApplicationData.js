import React, { useState, useEffect } from "react";

import Axios from "axios";

//This custom hook is responsible for loading the initial data from the API. 
//This hook will also provide the actions to update the state, causing the component to render. Storing it here to make app.js cleaner!

const useApplicationData = function() {

  //Refactored states and placed all state in Applicatin component within a single object.
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  function bookInterview(id, interview) {
    //Create new appointment object, within this object we will access spread everything within specific appointments object,
    //which we targetted via ID. We also replace interview object within appointment, with new interview object coming in. 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //Here we are now spreading all values from original appointments object in state, into new appointments object. 
    //and providing our appointment id with our appointment info. 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //Next we are going to make an axios put request with the information we want to depsit, the appointment, it will follow this alias: 
    //axios.put(url, data). We make the Axios put request, and upon the response (which is a 204 status), we set the State to include the new appointment. 
    return Axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(response => setState({...state, appointments})
    )
  }

  //This function will see interview object to null and make a delete request to the API to set interview by said ID to null. 
  //We pass this function to appointment, where we will use it as a prop in our function cancel
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return Axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(response => setState({...state, appointments})
  )}

  //Function to setDay individually using setState. 
  const setDay = day => setState({ ...state, day });

  //Trigger useEffect to make a request to /api/days using axios.get. Axios returns response in a promise and we update
  //the default days value by using setDays on the response.data(array of days objects)
  
  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])
  //Note, we include an empty array as second argument for useEffect which tells it that we only run this api request once when the 
  //component renders. This empty array, or state passed to this array tells useEffect what to do. If not added, will continuosly be triggered.
  
  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;