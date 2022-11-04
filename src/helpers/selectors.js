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