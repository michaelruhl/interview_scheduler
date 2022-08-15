import DayList from "./DayList";
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "./Appointment"
import axios from 'axios'
import {getAppointmentsForDay} from '../helpers/selectors'
import { getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
   
    },
    interviewers: {}
  });
  console.log(state)
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  // const schedule = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //     />
  //   );
  // });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  }

  // const setDays = days => setState(prev => ({ ...prev, days }));
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')

  ]).then(response => {
    // console.log(response)
      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
      // setDays(response.data)
    });
  }, [])


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
  day={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
        return ( <Appointment  bookInterview={bookInterview} interviewers={dailyInterviewers} key={appointment.id} {...appointment} />
        )})} 
      <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}
