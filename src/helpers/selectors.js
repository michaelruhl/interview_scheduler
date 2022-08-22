export function getAppointmentsForDay(state, day) {
  const filteredNames = state.days.filter((days) => days.name === day);
  if (!filteredNames[0]) {
    return [];
  }
  const filteredAppointments = filteredNames[0].appointments.map(
    (appointment) => {
      return state.appointments[appointment];
    }
  );

  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}


export function getInterviewersForDay(state, day) {
    const filteredNames = state.days.find((days) => days.name === day);
    if ( state.days.length === 0 || filteredNames === undefined) {
      return [];
    }
 
    return filteredNames.interviewers.map(id => state.interviewers[id])
   
  }

 

  
