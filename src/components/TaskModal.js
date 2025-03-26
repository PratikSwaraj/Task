import React, { useState, useEffect } from "react";
import "../App.css";

const TaskModal = ({ onClose, onSave, task }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To-Do");
  const [category, setCategory] = useState("Work");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate);
      setStatus(task.status);
      setCategory(task.category);
    }
  }, [task]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSave({ id: task?.id || Date.now(), title, dueDate, status, category });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{task ? "Edit Task" : "Add Task"}</h2>
        <input type="text" placeholder="Task Name" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <button onClick={handleSubmit}>{task ? "Update" : "Add"} Task</button>
        <button onClick={onClose} className="close-btn">Cancel</button>
      </div>
    </div>
  );
};

export default TaskModal;
