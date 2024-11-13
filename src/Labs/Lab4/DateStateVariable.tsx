import React, { useState } from "react";
export default function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date());
  const dateObjectToHtmlDateString = (date: Date) => {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1 < 10 ? "0" : ""}${
      date.getUTCMonth() + 1
    }-${date.getUTCDate() < 10 ? "0" : ""}${date.getUTCDate()}`;
  };
  
  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      <input
        className="form-control"
        type="date"
        defaultValue={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
<hr/></div>);}