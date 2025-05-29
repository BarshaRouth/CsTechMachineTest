import axios from 'axios';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AgentList from './components/AgentList';
import AgentTasks from './components/AgentTasks';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import UploadCSV from './components/UploadCSV';


function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/upload" element={<UploadCSV />} />
        <Route path="/agents" element={<AgentList />} />
        <Route path="/tasks/:agentId" element={<AgentTasks />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
