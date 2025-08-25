import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/dashboard-home', icon: 'Home' },
    { label: 'Angebote', path: '/local-offers-browse', icon: 'Tag' },
    { label: 'Rezepte', path: '/recipe-search-filter', icon: 'ChefHat' },
    { label: 'Liste', path: '/shopping-list', icon: 'ShoppingCart' },
  ];

  const secondaryItems = [
    { label: 'Karte', path: '/store-map-locator', icon: 'MapPin' },
    { label: 'Einstellungen', path: '/settings', icon: 'Settings' },
    { label: 'Hilfe', path: '/help', icon: 'HelpCircle' },
  ];

  const currentLocation = "Berlin, Mitte";
  const userName = "Anna M.";

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-200 bg-card border-b border-border safe-area-top">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ChefHat" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">SparKoch</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="text-sm"
              >
                {item?.label}
              </Button>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                iconName="MoreHorizontal"
                iconSize={16}
                className="text-sm"
              >
                Mehr
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevated z-300">
                  <div className="py-1">
                    {secondaryItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => handleNavigation(item?.path)}
                        className="w-full flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Icon name={item?.icon} size={16} className="mr-2" />
                        {item?.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Location Indicator */}
            <div className="hidden sm:flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{currentLocation}</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-secondary-foreground">
                  {userName?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="md:hidden"
              >
                <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-2 space-y-1">
              {[...navigationItems, ...secondaryItems]?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    location?.pathname === item?.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon name={item?.icon} size={16} className="mr-3" />
                  {item?.label}
                </button>
              ))}
              
              {/* Location in mobile menu */}
              <div className="flex items-center px-3 py-2 text-sm text-muted-foreground border-t border-border mt-2 pt-3">
                <Icon name="MapPin" size={16} className="mr-3" />
                {currentLocation}
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-100 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;