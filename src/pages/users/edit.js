// src/pages/users/edit.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({ nombre: '', email: '', rol_id: '' });

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${id}`, user);
      router.push('/users'); // Redirect back to the user list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-control"
            name="rol_id"
            value={user.rol_id}
            onChange={handleChange}
            required
          >
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update User
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => router.push('/users')}>
          Cancel
        </button>
      </form>
    </div>
  );
}
