import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CreateProject() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/projects/create', formData);
      router.push('/dashboard'); // Redirect back to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating project.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Project</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date (fecha_inicio)</label>
          <input
            type="date"
            name="fecha_inicio"
            className="form-control"
            value={formData.fecha_inicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date (fecha_fin)</label>
          <input
            type="date"
            name="fecha_fin"
            className="form-control"
            value={formData.fecha_fin}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create Project
        </button>
      </form>
    </div>
  );
}
