import React from 'react'
import { useNotification } from '../context/NotificationContext'

export const NotificationList: React.FC = () => {
  const { notifications, markAsRead } = useNotification()

  if (notifications.length === 0) {
    return (
      <div className="notification-list">
        <h2>Notificações</h2>
        <p>Nenhuma notificação</p>
      </div>
    )
  }

  return (
    <div className="notification-list">
      <h2>Notificações</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className={notification.read ? 'read' : ''}>
            <span>{notification.message}</span>
            {!notification.read && (
              <button onClick={() => markAsRead(notification.id)}>
                Marcar como lida
              </button>
            )}
            {notification.read && <span>Notificação lida</span>}
          </li>
        ))}
      </ul>
    </div>
  )
} 