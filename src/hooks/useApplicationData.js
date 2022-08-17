import axios from "axios";
import React, { useState, useEffect } from "react";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
        const updateSpotsValue = updateSpots(state.day, state.days, appointments)

      setState((prev) => ({ ...prev, appointments, days: updateSpotsValue }));
    });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const updateSpotsValue = updateSpots(state.day, state.days, appointments)
        setState((prev) => ({ ...prev, appointments, days: updateSpotsValue }));
    })
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);
  return {
    state, 
    bookInterview,
    cancelInterview,
    setDay
  }

  function updateSpots( day, days, appointments)    {
    const dayObj = days.find(foundDay => foundDay.name === day)
    let spots = 0;
    for (let appointmentID of dayObj.appointments)   {
        const appointment = appointments[appointmentID]
        
        if (!appointment.interview)  {
            spots += 1; 
        } 
    }

    const correctState= {
        ...dayObj, spots
    }

   const daysObj = days.map(newDay => newDay.name === day ? correctState : newDay)

   return daysObj;
  }

}

