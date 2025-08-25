import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationBanner = ({ notifications, onDismiss, onActionClick }) => {
  const [dismissedIds, setDismissedIds] = useState(new Set());

  const handleDismiss = (notificationId) => {
    setDismissedIds(prev => new Set([...prev, notificationId]));
    if (onDismiss) {
      onDismiss(notificationId);
    }
  };

  const handleActionClick = (notification) => {
    if (onActionClick) {
      onActionClick(notification);
    }
    if (notification?.actionRoute) {
      window.location.href = notification?.actionRoute;
    }
  };

  const visibleNotifications = notifications?.filter(n => !dismissedIds?.has(n?.id));

  if (visibleNotifications?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mb-6">
      {visibleNotifications?.map((notification) => (
        <div
          key={notification?.id}
          className={`rounded-xl p-4 border-l-4 ${
            notification?.type === 'warning' ?'bg-warning/10 border-warning text-warning-foreground'
              : notification?.type === 'success' ?'bg-success/10 border-success text-success-foreground'
              : notification?.type === 'error' ?'bg-error/10 border-error text-error-foreground' :'bg-primary/10 border-primary text-primary-foreground'
          }`}
        >
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <Icon 
                name={
                  notification?.type === 'warning' ? 'AlertTriangle' :
                  notification?.type === 'success' ? 'CheckCircle' :
                  notification?.type === 'error'? 'XCircle' : 'Info'
                } 
                size={20}
                className={
                  notification?.type === 'warning' ? 'text-warning' :
                  notification?.type === 'success' ? 'text-success' :
                  notification?.type === 'error'? 'text-error' : 'text-primary'
                }
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">{notification?.title}</h4>
              <p className="text-sm opacity-90 mb-3">{notification?.message}</p>
              
              {/* Action Button */}
              {notification?.actionText && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleActionClick(notification)}
                  className="text-xs"
                >
                  {notification?.actionText}
                </Button>
              )}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => handleDismiss(notification?.id)}
              className="flex-shrink-0 p-1 hover:bg-black/10 rounded-full transition-colors"
            >
              <Icon name="X" size={16} className="opacity-60" />
            </button>
          </div>

          {/* Progress Bar for Expiring Offers */}
          {notification?.type === 'warning' && notification?.expiresIn && (
            <div className="mt-3 pt-3 border-t border-current/20">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Läuft ab in:</span>
                <span className="font-medium">{notification?.expiresIn}</span>
              </div>
              <div className="w-full bg-current/20 rounded-full h-1">
                <div 
                  className="bg-current h-1 rounded-full transition-all duration-300"
                  style={{ width: `${notification?.timeProgress || 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;