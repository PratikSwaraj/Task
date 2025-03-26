import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import TaskModal from "./TaskModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveTask = (newTask) => {
    if (isEditMode) {
      setTasks(tasks.map((task) => (task.id === taskToEdit.id ? newTask : task)));
      setIsEditMode(false);
      setTaskToEdit(null);
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredTasks = tasks.filter((task) => (
    (filterCategory === "All" || task.category === filterCategory) &&
    (!filterDueDate || task.dueDate === filterDueDate) &&
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  return (
    <div className="dashboard">
      <header className="header">
        <h1>TaskBuddy</h1>
        <div className="user-info">
          <img src={user?.picture} alt="Profile" className="profile-pic" />
          <span>{user?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="controls">
        <div className="filters">
          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <input type="date" onChange={(e) => setFilterDueDate(e.target.value)} />
        </div>
        <input
          type="text"
          placeholder="Search by task name"
          className="search-box"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>Add Task</button>
      </div>

      {['To-Do', 'In Progress', 'Completed'].map((status) => (
        <div key={status} className="task-section">
          <h3>{status} ({filteredTasks.filter((task) => task.status === status).length})</h3>
          <div className="task-list">
            {filteredTasks.filter((task) => task.status === status).length === 0 ? (
              <p className="no-task">No Tasks in {status}</p>
            ) : (
              <table className="task-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.filter((task) => task.status === status).map((task) => (
                    <tr key={task.id} className="task-item">
                      <td>{task.title}</td>
                      <td>{task.dueDate}</td>
                      <td className="task-status" data-status={task.status}>{task.status}</td>
                      <td>{task.category}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditTask(task)}>✏️</button>
                        <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>❌</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}

      {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} task={taskToEdit} />}
    </div>
  );
};

export default Dashboard;
