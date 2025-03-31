import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ProjectTasks = () => {
  const router = useRouter();
  const { id } = router.query;  // Get project ID from URL

  const [tasks, setTasks] = useState([]); // Store tasks
  const [projectName, setProjectName] = useState(""); // Store project name

  // Fetch tasks for the project
  useEffect(() => {
    if (id) {
      // Fetch tasks for the selected project
      axios
        .get(`/api/tasks?proyecto_id=${id}`)
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => console.error("Error fetching tasks:", err));

      // Fetch project details (name, description, etc.)
      axios
        .get(`/api/projects/${id}`)
        .then((res) => {
          setProjectName(res.data.nombre);  // Assuming 'nombre' is the project name
        })
        .catch((err) => console.error("Error fetching project details:", err));
    }
  }, [id]);

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId)); // Remove task from state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (taskId, status) => {
    try {
      await axios.put(`/api/tasks/${taskId}`, { estado: status });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, estado: status } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Navigate to Add Task Page
  const handleAddTask = () => {
    router.push(`/tareas/nuevo?proyecto_id=${id}`);
  };

  return (
    <div>
      {/* Display project name at the top */}
      <h2>{projectName ? `Tasks for Project: ${projectName}` : "Loading..."}</h2>

      {/* Add Task Button */}
      <button
        onClick={handleAddTask}
        className="btn btn-primary mb-3"
      >
        Add Task
      </button>

      {/* Task List */}
      <ul className="list-group">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li 
              key={task.id} 
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{task.nombre}</strong>
                <p>{task.descripcion}</p>
                <p><strong>Start Date:</strong> {task.fecha_inicio}</p>
                <p><strong>End Date:</strong> {task.fecha_fin}</p>
                <p><strong>Priority:</strong> {task.prioridad}</p> {/* Display Priority */}
              </div>

              {/* Align Dropdown and Delete Button Side by Side */}
              <div className="d-flex align-items-center gap-2">
                <select
                  className="form-select form-select-sm"
                  value={task.estado}
                  onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                >
                  <option value="pendiente">Pending</option>
                  <option value="en_progreso">In Progress</option>
                  <option value="completada">Completed</option>
                </select>
                
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No tasks found for this project</p>
        )}
      </ul>
    </div>
  );
};

export default ProjectTasks;
