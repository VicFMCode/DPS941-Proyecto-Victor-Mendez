import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

const AddTask = () => {
    const router = useRouter();
    const { project_id } = router.query;  // Get project_id from query params

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("pendiente");
    const [usuario_id, setUsuarioId] = useState("");  // State for selected user ID
    const [usuarios, setUsuarios] = useState([]);  // State for list of users
    const [proyectos, setProyectos] = useState([]);  // State for list of projects
    const [selectedProyecto, setSelectedProyecto] = useState(project_id || ""); // Track selected project

    // Fetch the list of users and projects when the component mounts
    useEffect(() => {
        // Fetch users
        axios
            .get("/api/users")
            .then((res) => {
                setUsuarios(res.data);  // Assuming the API returns an array of users
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
            });

        // Fetch available projects
        axios
            .get("/api/projects")  // Assuming you have an API to fetch projects
            .then((res) => {
                setProyectos(res.data);  // Assuming the API returns an array of projects
            })
            .catch((err) => {
                console.error("Error fetching projects:", err);
            });
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Post the task along with selected user ID and project ID
            await axios.post("/api/tasks/create", {
                titulo,
                descripcion,
                estado,
                proyecto_id: selectedProyecto,  // Use selected project ID
                usuario_id,
            });
            router.push(`/proyectos/${selectedProyecto}`);  // Redirect to selected project page
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-control"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_progreso">En Progreso</option>
                        <option value="completada">Completada</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Assign User</label>
                    <select
                        className="form-control"
                        value={usuario_id}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        required
                    >
                        <option value="">Select a User</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre} {/* Assuming 'nombre' is the user's name */}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Assign Project</label>
                    <select
                        className="form-control"
                        value={selectedProyecto}
                        onChange={(e) => setSelectedProyecto(e.target.value)}
                    >
                        {proyectos.length > 0 ? (
                            proyectos.map((proyecto) => (
                                <option key={proyecto.id} value={proyecto.id}>
                                    {proyecto.nombre} {/* Assuming 'nombre' is the project name */}
                                </option>
                            ))
                        ) : (
                            <option>No projects available</option>
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Create Task</button>
            </form>
        </div>
    );
};

export default AddTask;
