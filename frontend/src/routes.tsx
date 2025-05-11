import React from 'react';
import { BrowserRouter as Router, Route, Routes as ReactRouterRoutes } from 'react-router-dom'; // Updated import for Routes
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import ProtectedRoute from './helpers/ProtectedRoute';
import WelcomePage from './components/Welcome/Welcome';


const Routes: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ReactRouterRoutes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<LoginPage />} />
        </ReactRouterRoutes>
      </Router>
    </AuthProvider>
  );
};

export default Routes;
