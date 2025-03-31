import { pool } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM Proyectos');
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ message: 'Database Error', error });
    }
  }
  
  return res.status(405).json({ message: 'Method Not Allowed' });
}
