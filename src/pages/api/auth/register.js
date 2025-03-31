import { pool } from '@/utils/db';
import bcrypt from 'bcryptjs'; // Change bcrypt to bcryptjs

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { nombre, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      'INSERT INTO Usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, 2] // Default role = 2 (Regular User)
    );

    res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}
