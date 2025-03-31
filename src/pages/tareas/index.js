// src/pages/tareas/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleEditTask = (taskId) => {
    router.push(`/tareas/${taskId}/editar`); // Redirect to edit task page
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      fetchTasks(); // Re-fetch tasks after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.nombre}</td>
              <td>{task.descripcion}</td>
              <td>{task.fecha_inicio}</td>
              <td>{task.fecha_fin}</td>
              <td>{task.usuario_id}</td>
              <td>
                <button className="btn btn-info me-2" onClick={() => handleEditTask(task.id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
