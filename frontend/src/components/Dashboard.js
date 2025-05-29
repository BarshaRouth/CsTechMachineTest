// src/components/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import AddAgent from './AddAgent';
import AgentList from './AgentList';
import UploadCSV from './UploadCSV';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <AddAgent />
        <UploadCSV />
      </div>
      <div className="mt-10">
        <AgentList />
      </div>
    </div>
  );
};

export default Dashboard;
