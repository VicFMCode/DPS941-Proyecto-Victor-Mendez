import { pool } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nombre, descripcion, fecha_inicio, fecha_fin, estado, prioridad, proyecto_id, usuario_id } = req.body;

    // Validate required fields
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !proyecto_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO Tareas (nombre, descripcion, fecha_inicio, fecha_fin, estado, prioridad, proyecto_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, fecha_inicio, fecha_fin, estado || 'pendiente', prioridad || 'media', proyecto_id, usuario_id || null]
      );
      return res.status(201).json({ id: result.insertId, nombre, descripcion, fecha_inicio, fecha_fin, estado, prioridad, proyecto_id, usuario_id });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: 'Database Error', error });
    }
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
