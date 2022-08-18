import React from "react";
import "../styles/DayListItem.scss";
import classNames from "classnames";
import { getAllByTestId } from "@testing-library/react";
// import FormatSpots from "./FormatSpots"

// export default function DayListItem(props) {
//   console.log(props);
//   const formatSpots = function (spots) {
    
//     if (spots === 1) {
//       return `${spots} spot `;
//       //    return <h3 className="text--light">1 spot remaining</h3>
//     }
//     if (spots > 1) {
//       return `${spots} spots `;
//       // return <h3 className="text--light">{spots} spots remaining</h3>
//     }

//     return `no spots `;
//     // return  <h3 className="text--light">no spots remaining</h3>
//   };
//   const dayClass = classNames("day-list__item", {
//     "day-list__item--selected": props.selected,
//     "day-list__item--full": props.spots === 0,
//   });
//   return (
//     <li className={dayClass} onClick={() => props.setDay(props.name)}>
//       <h2 className="text--regular">{props.name}</h2>
//       <h3 className="text--light">{formatSpots(props.spots)}remaining</h3>
//       {/* {formatSpots(props.spots)}    */}
//       {/* <FormatSpots spots={props.spots}/> */}
//     </li>
//   );
// }


export default function DayListItem(props) {
    // console.log(props);
    const formatSpots = function (spots) {
      let className;
      if (spots === 1) {
        className = `${spots} spot `;
        //    return <h3 className="text--light">1 spot remaining</h3>
      } else if (spots > 1) {
        className = `${spots} spots `;
        // return <h3 className="text--light">{spots} spots remaining</h3>
      } else {className = 'no spots '}
  
      return className;
      // return  <h3 className="text--light">no spots remaining</h3>
    };
    const dayClass = classNames("day-list__item", {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0,
    });
    return (
      <li data-testid="day"className={dayClass} onClick={() => props.setDay(props.name)}>
        <h2 className="text--regular">{props.name}</h2>
        <h3 className="text--light">{formatSpots(props.spots)}remaining</h3>
        {/* {formatSpots(props.spots)}    */}
        {/* <FormatSpots spots={props.spots}/> */}
      </li>
    );
  }
