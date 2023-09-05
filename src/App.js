import "./App.css";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

function App() {
  const [text, setText] = useState("");
  const [newTask, setNewTask] = useState([]);
  const [status, setStatus] = useState();
  const [taskId, setTaskId] = useState(null);
  const [addBtn, setAddBtn] = useState("Add");
  let [id, setId] = useState(0);
  const noTaskMessagesOnFilter = {
    all: "No Task Found",
    pending: "No Pending Tasks",
    completed: "No Completed Tasks",
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleDone = (items) => {
    const completed = newTask.map((tasks) => {
      if (tasks.id === items.id) {
        tasks.completed = true;
      }
      return tasks;
    });
    setNewTask(completed);
    return newTask;
  };

  const handleDelete = (items) => {
    const deleted = newTask.filter((tasks) => tasks.id !== items.id);
    setNewTask(deleted);
    return newTask;
  };

  const handleEdit = (items) => {
    const editTask = newTask.filter((tasks) => tasks.id === items.id);
    setAddBtn("Edit");
    setText(editTask[0].task);
    setTaskId(editTask[0].id);
    return newTask, taskId;
  };

  const handleAdd = () => {
    if (text) {
      if (addBtn === "Edit") {
        const edited = newTask.map((task) => {
          if (task.id === taskId) {
            task.task = text;
          }
          return task;
        });
        setNewTask(edited);
        setAddBtn("Add");
      }
      if (addBtn === "Add") {
        setId(++id);
        setNewTask([...newTask, { id: id, task: text, completed: false }]);
      }
    }
    setText("");
  };

  const handleFilter = (status) => {
    if (status === "all") {
      setStatus("all");
    } else if (status === "pending") {
      setStatus("pending");
    } else if (status === "completed") {
      setStatus("completed");
    }
  };

  const handleShowAllTasks = () => {
    if (newTask.length > 0) {
      return newTask;
    } else {
      return null;
    }
  };

  const handleShowPendingsTasks = () => {
    if (newTask.length > 0) {
      const pendingTask = newTask.filter((task) => task.completed === false);
      return pendingTask.length > 0 ? pendingTask : null;
    } else {
      return null;
    }
  };

  const handleShowCompletedTasks = () => {
    if (newTask.length > 0) {
      const completedTask = newTask.filter((task) => task.completed === true);
      return completedTask.length > 0 ? completedTask : null;
    } else {
      return null;
    }
  };

  const handleShowFilteredTasks = () => {
    let filtered = null;
    if (status === "all") {
      filtered = handleShowAllTasks();
    } else if (status === "pending") {
      filtered = handleShowPendingsTasks();
    } else if (status === "completed") {
      filtered = handleShowCompletedTasks();
    }
    if (filtered === null) {
      const enteredMessage = noTaskMessagesOnFilter[status];
      return <p>{enteredMessage}</p>;
    } else {
      return filtered.map((task, index) => {
        return <li key={index}>{task.task}</li>;
      });
    }
  };

  return (
    <div className="App-header">
      <div className="center">
        <h1>Manage your schedule</h1>
        <input
          id="taskInput"
          name="newTask"
          value={text}
          placeholder="Enter task"
          className="input-bar"
          onChange={handleChange}
        ></input>
        <button className="btn" id="addBtn" onClick={handleAdd}>
          {addBtn}
        </button>
        <br />
        <ul>
          {newTask.map((tasks, index) => {
            return (
              <div key={index} className="li-items">
                <li className="ind-li" key={index}>
                  <div className="list-items">
                    <div className="lis"> {tasks.task}</div>
                    <div className="btns-right">
                      <button
                        className="filter-btn-del"
                        onClick={() => handleDelete(tasks)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="filter-btn-edit"
                        onClick={() => handleEdit(tasks)}
                      >
                        Edit
                      </button>
                      <button
                        className="filter-btn-done"
                        onClick={() => handleDone(tasks)}
                        style={{
                          backgroundColor: tasks.completed ? "Green" : "Orange",
                        }}
                      >
                        {tasks.completed ? "Done" : "Pending"}
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
        <button className="btn" onClick={() => handleFilter("all")}>
          All
        </button>
        <button className="btn" onClick={() => handleFilter("pending")}>
          Pending
        </button>
        <button className="btn" onClick={() => handleFilter("completed")}>
          Completed
        </button>
        <ul>{handleShowFilteredTasks()}</ul>
      </div>
    </div>
  );
}
export default App;
