// src/pages/api/users/index.js
import { pool } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [users] = await pool.query('SELECT * FROM Usuarios');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  } else if (req.method === 'POST') {
    const { nombre, email, password, rol_id } = req.body;
    try {
      const [result] = await pool.query('INSERT INTO Usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)', [nombre, email, password, rol_id]);
      res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
