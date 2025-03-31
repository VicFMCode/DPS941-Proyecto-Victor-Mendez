import { pool } from '@/utils/db';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { taskId, estado } = req.body;

        if (!taskId || !estado) {
            return res.status(400).json({ message: 'Task ID and new status are required' });
        }

        try {
            const [result] = await pool.query('UPDATE Tareas SET estado = ? WHERE id = ?', [estado, taskId]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }

            return res.status(200).json({ message: 'Task updated successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error updating task', error: err.message });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
