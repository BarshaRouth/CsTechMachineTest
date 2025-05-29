import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem('token');
  axios.get('http://localhost:5000/api/agents', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => setAgents(res.data))
  .catch(err => console.error(err));
}, []);

  const deleteAgent = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/agents/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgents((prevAgents) => prevAgents.filter(agent => agent._id !== id));
    } catch (err) {
      console.error('Failed to delete agent:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Agent List</h2>
      <ul className="space-y-4">
        {agents.map((agent) => (
          <li key={agent._id} className="flex justify-between items-center border-b pb-2">
            <div>
              <span className="font-medium">{agent.name}</span> — 
              <Link to={`/tasks/${agent._id}`} className="ml-2 text-blue-600 hover:underline">View Tasks</Link>
            </div>
            <button
              onClick={() => deleteAgent(agent._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
