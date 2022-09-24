import React from "react";

function Reminder(props) {
  return (
    <span>
      {props.showCompletedReminders ? (
        <s>{props.reminder.title}</s>
      ) : (
        <span>{props.reminder.title}</span>
      )}
    </span>
  );
}

export default Reminder;
