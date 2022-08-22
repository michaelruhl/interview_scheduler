import React from "react";

export default function FormatSpots(props) {
  const { spots } = props;
  if (spots === 1) {
    return <h3 className="text--light">1 spot remaining</h3>;
  }
  if (spots > 1) {
    return <h3 className="text--light">{spots} spots remaining</h3>;
  }
  return <h3 className="text--light">no spots remaining</h3>;
}
