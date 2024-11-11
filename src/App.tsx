import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling
import Login from './pages/login/Login';
import UserManagement from './pages/users/UserManagement';
import Plans from './pages/plans/Plans';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './layout/Layout';
import PlansForm from './pages/plans/PlansForm';
import Dashboard from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="" element={<Layout><Dashboard /></Layout>} />
        </Route>
        <Route path="/plans" element={<PrivateRoute />}>
          <Route path="" element={<Layout><Plans /></Layout>} />
        </Route>
        <Route path="/plans/plan-form" element={<PrivateRoute />}>
          <Route path="" element={<Layout><PlansForm /></Layout>} />
        </Route>
        <Route path="/plan-form/:id" element={<Layout><PlansForm /></Layout>} />
        <Route path="/users" element={<PrivateRoute />}>
          <Route path="" element={<Layout><UserManagement /></Layout>} />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <ToastContainer /> {/* Add ToastContainer here */}
    </Router>
  );
};

export default App;
