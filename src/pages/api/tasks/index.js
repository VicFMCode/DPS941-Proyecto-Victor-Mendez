import { pool } from "@/utils/db";  // Your database pool

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { proyecto_id } = req.query;  // Extract project ID from the query string

    try {
      const [tasks] = await pool.query(
        "SELECT * FROM tareas WHERE proyecto_id = ?",  // Filter tasks by project ID
        [proyecto_id]
      );
      res.json(tasks);  // Return tasks related to the specified project
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Error fetching tasks" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });  // If method is not GET
  }
}
