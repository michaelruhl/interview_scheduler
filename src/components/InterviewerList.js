import React from "react";
import "../styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItems";
import PropTypes from 'prop-types';

function InterviewerList(props) {
 
    const interviewers = props.interviewers;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">

       {interviewers.map((interviewer) => {
        return <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() =>{props.onChange(interviewer.id);}}
        number={props.number}
        selected={interviewer.id === props.value}
        />
       })}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;