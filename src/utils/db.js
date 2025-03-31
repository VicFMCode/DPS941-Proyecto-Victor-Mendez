import mysql from 'mysql2/promise'; // Use promise-based version

// Create a connection pool using promise-based API
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Pass123', // Replace with your MySQL password
  database: 'task_admin', // Replace with your database name
});

export { pool };
