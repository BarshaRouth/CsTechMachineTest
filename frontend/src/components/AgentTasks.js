import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AgentTasks() {
  const { agentId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/tasks/agent/${agentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchTasks();
}, [agentId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks for Agent</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="border p-3 rounded bg-white shadow-sm">
            <div><strong>Name:</strong> {task.firstName}</div>
            <div><strong>Phone:</strong> {task.phone}</div>
            <div><strong>Notes:</strong> {task.notes}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
