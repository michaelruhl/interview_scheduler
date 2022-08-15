import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };

      props.bookInterview(props.id, interview)
    }

    return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (<Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />)}
    </article>
  );
  // {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
}
