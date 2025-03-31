// src/pages/api/users/[id].js
import { pool } from '@/utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT id, nombre, email, rol_id FROM Usuarios WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user', error });
    }
  }

  if (req.method === 'PUT') {
    const { nombre, email, rol_id } = req.body;
    try {
      console.log('Updating user:', { id, nombre, email, rol_id });
      const [result] = await pool.query('UPDATE Usuarios SET nombre = ?, email = ?, rol_id = ? WHERE id = ?', [nombre, email, rol_id, id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user', error });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
