import { pool } from '@/utils/db';

export default async function handler(req, res) {
  const { id } = req.query; // Project ID from the request URL

  if (req.method === 'GET') {
    try {
      const [tasks] = await pool.query('SELECT * FROM Tareas WHERE proyecto_id = ?', [id]);

      if (tasks.length === 0) {
        return res.status(200).json([]); // Return empty array if no tasks found
      }

      return res.status(200).json(tasks);
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error', error });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
