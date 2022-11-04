export function getAppointmentsForDay(state, day) {
  
  const filteredDaysForDayMatch = state.days.filter(dayObj => dayObj.name === day)

  if (state.days.length === 0 || filteredDaysForDayMatch[0] === undefined) {
    return [];
  }

  console.log(filteredDaysForDayMatch[0])

  return filteredDaysForDayMatch[0].appointments.map(ID => state.appointments[ID] )




  // const filteredAppointmentsMatch = state.appointments.filter(appointmentIDs => appointmentIDs ===  )

  // console.log(Object.keys(state.appointments))

  // return filteredDaysForDayMatch

}