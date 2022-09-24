import React, { useState } from "react";
import "./App.css";
import Reminder from "./components/Reminder";
import Header from "./components/Header";

function App() {
  // Object to define the properties of a reminder.
  const initialReminder = { title: "", completed: false, id: 0 };

  // State defined for storing reminder.
  const [reminder, setReminder] = useState(initialReminder);

  // State that stores the list of reminders.
  const [reminders, setReminders] = useState([]);

  // State that is used to toggle between displaying the oustanding or completed reminders on the page.
  const [showCompletedReminders, setShowCompletedReminders] = useState(false);

  // Function that sets the new reminder.
  const setNewReminder = (e) => {
    setReminder({
      title: e.target.value,
      completed: false,
      id: Math.floor(Math.random() * 1000),
    });
  };

  // Function that adds new reminder to the Reminders state.
  const addReminder = () => {
    if (reminder.title) {
      setReminders((oldReminders) => [...oldReminders, reminder]);
    }
    setReminder(initialReminder);
  };

  // Change the reminder as completed -- true.
  const completeReminder = (id) => {
    const updatedReminders =
      reminders &&
      reminders.map((myReminder) => {
        if (myReminder.id === id) {
          myReminder.completed = true;
        }
        return myReminder;
      });

    if (!updatedReminders) {
      return;
    }

    setReminders(updatedReminders);
  };

  // Display the reminders -- either completed or uncompleted.
  const displayedReminders = () => {
    let completedReminders = [];
    let uncompletedReminders = [];

    reminders &&
      reminders.map((myReminder) => {
        if (myReminder?.completed == true) {
          completedReminders.push(myReminder);
        } else if (myReminder?.completed == false) {
          uncompletedReminders.push(myReminder);
        }
      });

    if (showCompletedReminders) {
      return completedReminders;
    }
    return uncompletedReminders;
  };

  // Delete the reminder.
  const deleteReminder = (id) => {
    const remainingReminders = reminders.filter((myReminder) => {
      return myReminder.id !== id;
    });

    setReminders(remainingReminders);
  };

  return (
    <div className="app">
      <Header />

      <input
        type="text"
        placeholder="Add a new reminder.."
        value={reminder.title}
        onChange={(e) => setNewReminder(e)}
      />

      <button onClick={() => addReminder()}>Add Reminder</button>

      <div>
        <p>
          Showing : {showCompletedReminders ? "Completed" : "Outstanding"}{" "}
          reminders
        </p>
        <p>
          Click to{" "}
          <button
            onClick={() =>
              setShowCompletedReminders((showCompleted) => !showCompleted)
            }
          >
            {" "}
            Show {showCompletedReminders ? "outstanding" : "completed"}{" "}
            reminders
          </button>
        </p>
      </div>

      {displayedReminders() &&
        displayedReminders().map((reminder) => (
          <div>
            <Reminder
              reminder={reminder}
              showCompletedReminders={showCompletedReminders}
            />

            {!showCompletedReminders && (
              <button
                className="my-button"
                onClick={() => completeReminder(reminder.id)}
              >
                Complete✅
              </button>
            )}

            <button
              className="my-botton"
              onClick={() => deleteReminder(reminder.id)}
            >
              ❌
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
