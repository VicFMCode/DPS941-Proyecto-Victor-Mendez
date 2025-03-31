import { pool } from '@/utils/db';

export default async function handler(req, res) {
    const { id } = req.query; // Project ID

    if (req.method === 'GET') {
        if (!id) {
            console.error('Project ID is missing');
            return res.status(400).json({ message: 'Project ID is required' });
        }

        try {
            console.log('Fetching tasks for project ID:', id);

            // Query to fetch tasks based on the project ID
            // Assuming the project_id is just the `id` column in the Tareas table
            const [rows] = await pool.query('SELECT id, nombre, estado FROM Tareas WHERE id = ?', [id]);

            if (rows.length === 0) {
                console.log('No tasks found for project ID:', id);
                return res.status(404).json({ message: 'No tasks found' });
            }

            console.log('Tasks fetched for project ID:', id, rows);

            return res.status(200).json(rows);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).json({ message: 'Error fetching tasks', error: err.message });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
