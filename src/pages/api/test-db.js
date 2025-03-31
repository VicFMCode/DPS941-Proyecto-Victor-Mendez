import { pool } from '@/utils/db';

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.status(200).json({ message: 'Database connection successful!', result: rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
}
