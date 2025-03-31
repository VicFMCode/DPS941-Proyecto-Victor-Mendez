import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch project data for editing
  useEffect(() => {
    if (id) {
      axios
        .get(`/api/projects/${id}`)
        .then((res) => {
          setProject(res.data);
          setLoading(false);
        })
        .catch((err) => console.error('Error fetching project:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/projects/${id}`, project);
      router.push('/proyectos'); // Redirect back to the projects list
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={project.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={project.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="fecha_inicio"
            className="form-control"
            value={project.fecha_inicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="fecha_fin"
            className="form-control"
            value={project.fecha_fin}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;
