import React, { useState } from 'react';
import axios from 'axios';

export default function AddAgent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/agents/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message);
      setFormData({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding agent');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Add New Agent</h3>
      {message && <p className="text-sm mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="mobile" placeholder="Mobile (+91...)" value={formData.mobile} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Agent
        </button>
      </form>
    </div>
  );
}
