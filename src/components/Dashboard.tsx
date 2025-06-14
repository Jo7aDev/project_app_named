import React from 'react';
import { useAuth } from '../context/AuthContext';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { NotificationList } from './NotificationList';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <header>
        <h1>Bem-vindo, {user?.name || 'Usuário'}!</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <main>
        <section className="tasks-section">
          <h2>Minhas Tarefas</h2>
          <TaskForm />
          <TaskList />
        </section>

        <section className="notifications-section">
          <NotificationList />
        </section>
      </main>
    </div>
  );
}; 