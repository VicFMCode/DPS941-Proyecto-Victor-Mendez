import { pool } from '@/utils/db';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { taskId } = req.body;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        try {
            const [result] = await pool.query('DELETE FROM Tareas WHERE id = ?', [taskId]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }

            return res.status(200).json({ message: 'Task deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error deleting task', error: err.message });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
