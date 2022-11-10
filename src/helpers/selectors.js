//This function receives state object with days and appointments and given day name. 

export function getAppointmentsForDay(state, day) {
  //Here we filter over state.days array, looking at each obj within the array and check if obj name === day(second argument)
  //Important note, .filter will always provide your answer within an array. Hence why we will need to use [0] to access it later on. 
  const filteredDaysForDayMatch = state.days.filter(dayObj => dayObj.name === day)

  //Handle edge cases by checking if state.days array of objs is empty OR if filtered object = undefined, meaning that no names matched in previous step. 
  //In that case we return an empty array! 
  if (state.days.length === 0 || filteredDaysForDayMatch[0] === undefined) {
    return [];
  }

  //Finally we target object within filterdDaysforDayMatch using[0], this is the object with the day that matched
  //We access it's appointments, which is an array, using .appointments and we map over it. Each value we map over in array is an ID
  //Use each of those mapped IDS to plug into state.appointments object. With this method, 
  //we are using mapped IDS from state days appointmens to directly acquire the state.appoinment IDS and thus corresponding objects.
  return filteredDaysForDayMatch[0].appointments.map(ID => state.appointments[ID] )
}

export function getInterview(state, interview) {
  //Start off with if conditional to check if interview.interview is truthy, or in other words not null.
    if (interview?.interviewer) {
      //If truthy, use object.values to eliminate keys of state.interviewers and store objects in array. Filter/loop over array and call each object interviewer
      //Check to see if the interviewer id matches the id of the interviewer in the interview object passed. 
       const interviewerObject = Object.values(state.interviewers).filter(interviewer => interviewer.id === interview.interviewer)[0]
       //When match foound, create new interviewObj that stores information of interviewer object + corresponding student name. 
       const interviewerObj = { 
         student: interview.student,
         interviewer: interviewerObject
        }
     
        return interviewerObj;
    }
    return null
}

export function getInterviewersForDay(state, day) {

  const filteredDaysForDayMatch = state.days.filter(dayObj => dayObj.name === day)

  if (state.days.length === 0 || filteredDaysForDayMatch[0] === undefined) {
    return [];
  }

  return filteredDaysForDayMatch[0].interviewers.map(ID => state.interviewers[ID] )
}