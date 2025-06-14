import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { NotificationProvider } from './context/NotificationContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import Welcome from './pages/Welcome';
import CreateTask from './pages/CreateTask';
import Diary from './pages/Diary';
import Report from './pages/Report';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/create-task" 
              element={
                <ProtectedRoute>
                  <CreateTask />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/diary" 
              element={
                <ProtectedRoute>
                  <Diary />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/report" 
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </NotificationProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;