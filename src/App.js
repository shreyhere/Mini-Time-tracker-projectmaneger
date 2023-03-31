import React, { useState } from 'react';
import './App.css';

function App() {
  // State for storing projects
  const [projects, setProjects] = useState([]);

  // State for storing tasks
  const [tasks, setTasks] = useState([]);

  // State for storing time spent on tasks
  const [timeSpent, setTimeSpent] = useState({});

  // Function to add a new project
  const addProject = (title) => {
    setProjects([...projects, { title }]);
  };

  // Function to add a new task
  const addTask = (title, projectId) => {
    setTasks([...tasks, { title, projectId }]);
  };

  // Function to track time spent on a task
  const trackTime = (taskId, time) => {
    setTimeSpent({ ...timeSpent, [taskId]: (timeSpent[taskId] || 0) + time });
  };

  return (
    <div className="App">
      <header>
        <h1>Time Tracking Application</h1>
      </header>

      <main>
        <div className="projects">
          <h2>Projects</h2>

          <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.elements.title.value;
            addProject(title);
            e.target.reset();
          }}>
            <input type="text" name="title" placeholder="Project Title" required /><br/>
            <button type="submit">Create Project</button>
          </form>

          <div>
            {projects.map((project, index) => (
              <div key={index}>{project.title}</div>
            ))}
          </div>
        </div>

        <div className="tasks">
          <h2>Tasks</h2>

          <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.elements.title.value;
            const projectId = e.target.elements.projectId.value;
            addTask(title, projectId);
            e.target.reset();
          }}>
            <input type="text" name="title" placeholder="Task Title" required />
            <select name="projectId" required>
              <option value="">Select a project</option>
              {projects.map((project, index) => (
                <option key={index} value={index}>{project.title}</option>
              ))}
            </select><br/>
            <button type="submit">Create Task</button>
          </form>

          <div>
            {tasks.map((task, index) => (
              <div key={index}>
                <div className="task-header">
                  <div className="task-title">{task.title}</div>
                  <div className="task-project">{projects[task.projectId].title}</div>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const time = parseInt(e.target.elements.time.value);
                  trackTime(index, time);
                  e.target.reset();
                }}>
                  <input type="number" name="time" placeholder="Time Spent (in minutes)" required />
                  <button type="submit">Track Time</button>
                </form>
                <div className="task-time">Time Spent: {timeSpent[index] || 0} minutes</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      
    </div>
  );
}

export default App;
