import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCreateProject = () => {
    router.push('/proyectos/nuevo'); // Redirect to project creation page
  };

  const handleEditProject = (projectId) => {
    router.push(`/proyectos/${projectId}/editar`); // Redirect to project edit page
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      fetchProjects(); // Re-fetch the projects after deletion
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleAdminUsuarios = () => {
    router.push('/users'); // Redirect to user management page
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard - Project Management</h2>
      <button className="btn btn-primary mb-3" onClick={handleCreateProject}>
        Create New Project
      </button>
      <button className="btn btn-secondary mb-3 ms-3" onClick={handleAdminUsuarios}>
        Administrar Usuarios
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.nombre}</td>
              <td>{project.descripcion}</td>
              <td>
                <button className="btn btn-info me-2" onClick={() => router.push(`/proyectos/${project.id}`)}>
                  View
                </button>
                <button className="btn btn-warning me-2" onClick={() => handleEditProject(project.id)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteProject(project.id)}>
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
