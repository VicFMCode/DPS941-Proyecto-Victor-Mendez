import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onUpdate }) => {
  const [status, setStatus] = useState(task.estado);

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(`/api/tasks/${task.id}`, { estado: newStatus });
      setStatus(newStatus);
      onUpdate(); // Refresh the task list after update
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="card p-3 mb-2">
      <h5>{task.nombre}</h5>
      <p>{task.descripcion}</p>
      
      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="form-select"
      >
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En Progreso</option>
        <option value="completado">Completado</option>
      </select>
    </div>
  );
};

export default TaskItem;
