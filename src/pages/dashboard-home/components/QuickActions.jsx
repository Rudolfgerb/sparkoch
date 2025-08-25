import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'shopping-list',
      title: 'Einkaufsliste',
      subtitle: '12 Artikel',
      icon: 'ShoppingCart',
      color: 'bg-primary',
      route: '/shopping-list',
      badge: 12
    },
    {
      id: 'favorites',
      title: 'Favoriten',
      subtitle: '8 Rezepte',
      icon: 'Heart',
      color: 'bg-error',
      route: '/recipe-search-filter?filter=favorites',
      badge: null
    },
    {
      id: 'nearby-deals',
      title: 'Angebote',
      subtitle: 'In der Nähe',
      icon: 'MapPin',
      color: 'bg-secondary',
      route: '/local-offers-browse',
      badge: 3
    },
    {
      id: 'store-finder',
      title: 'Geschäfte',
      subtitle: '5 in 2km',
      icon: 'Store',
      color: 'bg-warning',
      route: '/store-map-locator',
      badge: null
    }
  ];

  const handleActionClick = (action) => {
    if (onActionClick) {
      onActionClick(action);
    }
    window.location.href = action?.route;
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Schnellzugriff</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className="bg-card rounded-xl p-4 text-left hover:shadow-elevated transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-border"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              
              {action?.badge && (
                <div className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full min-w-[20px] text-center">
                  {action?.badge > 99 ? '99+' : action?.badge}
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-1">{action?.title}</h4>
              <p className="text-sm text-muted-foreground">{action?.subtitle}</p>
            </div>
            
            <div className="flex items-center justify-end mt-3">
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;