import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/dashboard-home', 
      icon: 'Home',
      badge: null
    },
    { 
      label: 'Angebote', 
      path: '/local-offers-browse', 
      icon: 'Tag',
      badge: 3
    },
    { 
      label: 'Rezepte', 
      path: '/recipe-search-filter', 
      icon: 'ChefHat',
      badge: null
    },
    { 
      label: 'Liste', 
      path: '/shopping-list', 
      icon: 'ShoppingCart',
      badge: 12
    },
    { 
      label: 'Karte', 
      path: '/store-map-locator', 
      icon: 'MapPin',
      badge: null
    },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems?.map((item) => {
          const active = isActive(item?.path);
          
          return (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`relative flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors animate-spring ${
                active 
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={item?.label}
            >
              <div className="relative">
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  strokeWidth={active ? 2.5 : 2}
                />
                
                {/* Badge */}
                {item?.badge && (
                  <div className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center px-1">
                    {item?.badge > 99 ? '99+' : item?.badge}
                  </div>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium truncate w-full text-center ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item?.label}
              </span>
              {/* Active indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;