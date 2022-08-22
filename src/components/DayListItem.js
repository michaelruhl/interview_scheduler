import React from "react";
import "../styles/DayListItem.scss";
import classNames from "classnames";
import { getAllByTestId } from "@testing-library/react";

export default function DayListItem(props) {
  const formatSpots = function (spots) {
    let className;
    if (spots === 1) {
      className = `${spots} spot `;
    } else if (spots > 1) {
      className = `${spots} spots `;
    } else {
      className = "no spots ";
    }

    return className;
  };
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}remaining</h3>
    </li>
  );
}
