import { pool } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;

    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO Proyectos (nombre, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)',
        [nombre, descripcion, fecha_inicio, fecha_fin]
      );
      return res.status(201).json({
        id: result.insertId,
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Database Error', error });
    }
  }
  
  return res.status(405).json({ message: 'Method Not Allowed' });
}
