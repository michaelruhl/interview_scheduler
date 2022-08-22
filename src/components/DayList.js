import React from "react";
import DayListItem from "./DayListItem";
import "../styles/DayList.scss";

export default function DayList(props) {
  const days = props.days;

  return (
    <ul>
      {days.map((day) => {
        return (
          <DayListItem
            key={day.id}
            selected={day.name === props.day}
            setDay={props.onChange}
            spots={day.spots}
            name={day.name}
          />
        );
      })}
    </ul>
  );
}
