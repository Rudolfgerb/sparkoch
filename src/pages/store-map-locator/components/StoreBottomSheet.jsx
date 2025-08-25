import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StoreBottomSheet = ({ 
  store = null, 
  isOpen = false, 
  onClose, 
  onViewOffers,
  onGetDirections,
  onStartRoute 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!store) return null;

  const handleViewOffers = () => {
    if (onViewOffers) {
      onViewOffers(store);
    }
  };

  const handleGetDirections = () => {
    if (onGetDirections) {
      onGetDirections(store);
    }
  };

  const handleStartRoute = () => {
    if (onStartRoute) {
      onStartRoute(store);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getStoreStatusColor = (isOpen) => {
    return isOpen ? 'text-success' : 'text-error';
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance?.toFixed(1)}km`;
  };

  const formatOpeningHours = (hours) => {
    const today = new Date()?.getDay();
    const todayHours = hours?.[today];
    return todayHours || 'Geschlossen';
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
      {/* Bottom Sheet */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-card rounded-t-xl shadow-elevated z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        ${isExpanded ? 'h-[80vh]' : 'h-auto'}
      `}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-4 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={store?.logo}
                    alt={`${store?.name} Logo`}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{store?.name}</h3>
                  <p className="text-sm text-muted-foreground">{store?.chain}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{formatDistance(store?.distance)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className={getStoreStatusColor(store?.isOpen)}>
                    {store?.isOpen ? 'Geöffnet' : 'Geschlossen'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{store?.offers} Angebote</span>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={handleViewOffers}
              iconName="Tag"
              iconPosition="left"
              iconSize={16}
              className="text-sm"
            >
              Angebote
            </Button>
            
            <Button
              variant="outline"
              onClick={handleGetDirections}
              iconName="Navigation"
              iconPosition="left"
              iconSize={16}
              className="text-sm"
            >
              Route
            </Button>
            
            <Button
              variant="default"
              onClick={handleStartRoute}
              iconName="Play"
              iconPosition="left"
              iconSize={16}
              className="text-sm"
            >
              Start
            </Button>
          </div>
        </div>

        {/* Expandable Content */}
        <div className="border-t border-border">
          <button
            onClick={toggleExpanded}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent transition-colors"
          >
            <span className="text-sm font-medium">Details anzeigen</span>
            <Icon 
              name={isExpanded ? "ChevronDown" : "ChevronUp"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </button>

          {isExpanded && (
            <div className="px-4 pb-4 space-y-4 max-h-96 overflow-y-auto">
              {/* Store Information */}
              <div>
                <h4 className="text-sm font-medium mb-2">Geschäftsinformationen</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Adresse:</span>
                    <span className="text-right">{store?.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telefon:</span>
                    <span>{store?.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Öffnungszeiten:</span>
                    <span>{formatOpeningHours(store?.openingHours)}</span>
                  </div>
                </div>
              </div>

              {/* Current Offers Preview */}
              <div>
                <h4 className="text-sm font-medium mb-2">Aktuelle Angebote</h4>
                <div className="space-y-2">
                  {store?.topOffers?.slice(0, 3)?.map((offer, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-accent rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                          <Image
                            src={offer?.image}
                            alt={offer?.product}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{offer?.product}</p>
                          <p className="text-xs text-muted-foreground">{offer?.brand}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">{offer?.price}</p>
                        <p className="text-xs text-muted-foreground line-through">{offer?.originalPrice}</p>
                      </div>
                    </div>
                  ))}
                  
                  {store?.offers > 3 && (
                    <Button
                      variant="ghost"
                      onClick={handleViewOffers}
                      className="w-full text-sm"
                    >
                      Alle {store?.offers} Angebote anzeigen
                    </Button>
                  )}
                </div>
              </div>

              {/* Services */}
              {store?.services && store?.services?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {store?.services?.map((service, index) => (
                      <div key={index} className="px-2 py-1 bg-muted rounded text-xs">
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StoreBottomSheet;