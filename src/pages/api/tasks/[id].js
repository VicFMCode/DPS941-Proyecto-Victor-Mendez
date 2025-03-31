import { pool } from '@/utils/db';

export default async function handler(req, res) {
  const { id } = req.query; // Get task ID from URL

  if (req.method === 'PUT') {
    const { estado } = req.body;

    // Log incoming request for debugging
    console.log(`Updating Task ID: ${id} - New Status: ${estado}`);

    // Validate request data
    if (!estado) {
      return res.status(400).json({ message: 'Estado is required' });
    }

    // Allowed ENUM values (as per the database schema)
    const allowedStates = ['pendiente', 'en_progreso', 'completada'];
    if (!allowedStates.includes(estado)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
      // Update task status in the database
      const [result] = await pool.query(
        'UPDATE Tareas SET estado = ? WHERE id = ?',
        [estado, id]
      );

      // If no rows were affected, the task doesn't exist
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }

      return res.status(200).json({ message: 'Task updated successfully' });
    } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error updating task', error: err });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
