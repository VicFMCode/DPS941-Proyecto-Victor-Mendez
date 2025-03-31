// pages/api/tasks/[id].js
import { pool } from '@/utils/db';

export default async function handler(req, res) {
    const { id } = req.query;
    
    if (!id) {
        return res.status(400).json({ message: 'Task ID is required' });
    }

    if (req.method === 'PUT') {
        // Update task status
        const { estado } = req.body;

        if (!estado) {
            return res.status(400).json({ message: 'Task status is required' });
        }

        try {
            await pool.query(
                'UPDATE Tareas SET estado = ? WHERE id = ?',
                [estado, id]
            );
            res.status(200).json({ message: 'Task updated successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error updating task', error: err });
        }
    } 
    else if (req.method === 'DELETE') {
        // Delete a task
        try {
            await pool.query('DELETE FROM Tareas WHERE id = ?', [id]);
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting task', error: err });
        }
    } 
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
