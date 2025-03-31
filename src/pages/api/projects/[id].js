import { pool } from "@/utils/db";  // Your database pool

export default async function handler(req, res) {
  const { id } = req.query;  // Extract project ID from the URL path parameter

  if (req.method === "GET") {
    try {
      // Query the database for project details using the project ID
      const [rows] = await pool.query(
        "SELECT nombre FROM Proyectos WHERE id = ?",  // Assuming the project name is stored in 'nombre' field
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Project not found" });  // Return 404 if no project found
      }

      // Respond with the project name
      res.status(200).json({
        nombre: rows[0].nombre,  // Send back the project name
      });
    } catch (error) {
      console.error("Error fetching project details:", error);
      res.status(500).json({ message: "Error fetching project", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });  // If method is not GET
  }
}
