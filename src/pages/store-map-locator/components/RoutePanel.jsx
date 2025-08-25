import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoutePanel = ({ 
  isVisible = false, 
  onClose, 
  routeData = null, 
  onStartNavigation,
  onOptimizeRoute,
  selectedStores = [] 
}) => {
  const [routeType, setRouteType] = useState('fastest'); // fastest, shortest, eco

  if (!isVisible) return null;

  const handleStartNavigation = () => {
    if (onStartNavigation && routeData) {
      onStartNavigation(routeData);
    }
  };

  const handleOptimizeRoute = () => {
    if (onOptimizeRoute) {
      onOptimizeRoute(selectedStores, routeType);
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} Min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance?.toFixed(1)}km`;
  };

  const routeOptions = [
    { value: 'fastest', label: 'Schnellste Route', icon: 'Zap' },
    { value: 'shortest', label: 'Kürzeste Route', icon: 'Minimize2' },
    { value: 'eco', label: 'Umweltfreundlich', icon: 'Leaf' }
  ];

  return (
    <div className="absolute top-0 right-0 w-80 h-full bg-card border-l border-border shadow-lg z-40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Route" size={20} />
          <h2 className="text-lg font-semibold">Routenplanung</h2>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Content */}
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Route Type Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Routentyp</h3>
            <div className="space-y-2">
              {routeOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setRouteType(option?.value)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    routeType === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-accent'
                  }`}
                >
                  <Icon name={option?.icon} size={16} />
                  <span className="text-sm font-medium">{option?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Stores */}
          <div>
            <h3 className="text-sm font-medium mb-3">
              Ausgewählte Geschäfte ({selectedStores?.length})
            </h3>
            <div className="space-y-2">
              {selectedStores?.map((store, index) => (
                <div key={store?.id} className="flex items-center space-x-3 p-2 bg-accent rounded-lg">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{store?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{store?.address}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistance(store?.distance)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Route Summary */}
          {routeData && (
            <div>
              <h3 className="text-sm font-medium mb-3">Routenübersicht</h3>
              <div className="bg-accent rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm">Gesamtzeit</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatDuration(routeData?.totalDuration)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm">Gesamtstrecke</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatDistance(routeData?.totalDistance)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Fuel" size={16} className="text-muted-foreground" />
                    <span className="text-sm">Geschätzte Kosten</span>
                  </div>
                  <span className="text-sm font-medium">
                    {routeData?.estimatedCost}€
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Tag" size={16} className="text-muted-foreground" />
                    <span className="text-sm">Mögliche Ersparnis</span>
                  </div>
                  <span className="text-sm font-medium text-success">
                    {routeData?.potentialSavings}€
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Route Steps */}
          {routeData?.steps && (
            <div>
              <h3 className="text-sm font-medium mb-3">Routenschritte</h3>
              <div className="space-y-2">
                {routeData?.steps?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 bg-background rounded-lg">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{step?.instruction}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                        <span>{formatDistance(step?.distance)}</span>
                        <span>{formatDuration(step?.duration)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-4 space-y-3">
          <Button
            variant="outline"
            onClick={handleOptimizeRoute}
            iconName="Shuffle"
            iconPosition="left"
            iconSize={16}
            className="w-full"
          >
            Route optimieren
          </Button>

          <Button
            variant="default"
            onClick={handleStartNavigation}
            disabled={!routeData}
            iconName="Navigation"
            iconPosition="left"
            iconSize={16}
            className="w-full"
          >
            Navigation starten
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoutePanel;