import React from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'
import {useState} from 'react'

export default function Form(props) {
const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

// console.log(interviewer)

const reset = () => {
    setStudent('');
    setInterviewer(null);
   
  };

const cancel = () => {
    reset()
    props.onCancel()
}

    return ( 
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={(e) => setStudent(e.target.value)}
        value={student}

      />
    </form>
    <InterviewerList 
        interviewers={props.interviewers}
        onChange={setInterviewer}
        value={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
    </section>
  </section>
</main>
)} 