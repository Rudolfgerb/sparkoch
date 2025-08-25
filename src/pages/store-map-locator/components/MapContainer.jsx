import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapContainer = ({ 
  stores = [], 
  selectedStore = null, 
  onStoreSelect, 
  userLocation = null,
  showRoute = false,
  routeData = null,
  mapFilters = {},
  onMapReady = null
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [userLocationEnabled, setUserLocationEnabled] = useState(false);

  // Mock map implementation since we can't use actual MapLibreGL
  useEffect(() => {
    if (mapRef?.current && !mapInstanceRef?.current) {
      // Simulate map initialization
      setTimeout(() => {
        setIsMapLoaded(true);
        if (onMapReady) {
          onMapReady();
        }
      }, 1000);
    }
  }, [onMapReady]);

  const handleLocationRequest = () => {
    setUserLocationEnabled(true);
    // Simulate getting user location
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation?.getCurrentPosition(
          (position) => {
            console.log('User location:', position?.coords);
          },
          (error) => {
            console.error('Location error:', error);
            setUserLocationEnabled(false);
          }
        );
      }
    }, 500);
  };

  const handleZoomIn = () => {
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    console.log('Zoom out');
  };

  const handleCenterMap = () => {
    console.log('Center map on user location');
  };

  const getStoreColor = (store) => {
    if (store?.offers > 20) return '#10B981'; // emerald-500 - many offers
    if (store?.offers > 10) return '#F59E0B'; // amber-500 - some offers
    return '#6B7280'; // gray-500 - few offers
  };

  const filteredStores = stores?.filter(store => {
    if (mapFilters?.chains && mapFilters?.chains?.length > 0) {
      return mapFilters?.chains?.includes(store?.chain);
    }
    if (mapFilters?.radius) {
      return store?.distance <= parseFloat(mapFilters?.radius);
    }
    return true;
  });

  return (
    <div className="relative w-full h-full bg-muted">
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="w-full h-full relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
        }}
      >
        {/* Loading State */}
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Karte wird geladen...</p>
            </div>
          </div>
        )}

        {/* Mock Map with Store Pins */}
        {isMapLoaded && (
          <div className="absolute inset-0">
            {/* Mock map background pattern */}
            <div className="w-full h-full opacity-20">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#9CA3AF" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Store Pins */}
            {filteredStores?.map((store, index) => (
              <div
                key={store?.id}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-110"
                style={{
                  left: `${30 + (index % 3) * 25}%`,
                  top: `${20 + Math.floor(index / 3) * 20}%`,
                }}
                onClick={() => onStoreSelect(store)}
              >
                {/* Store Pin */}
                <div className="relative">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: getStoreColor(store) }}
                  >
                    <Icon name="ShoppingCart" size={16} color="white" />
                  </div>
                  
                  {/* Offer Count Badge */}
                  {store?.offers > 0 && (
                    <div className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {store?.offers > 99 ? '99+' : store?.offers}
                    </div>
                  )}
                  
                  {/* Selected Store Indicator */}
                  {selectedStore?.id === store?.id && (
                    <div className="absolute -inset-2 border-2 border-primary rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}

            {/* User Location Pin */}
            {userLocationEnabled && userLocation && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: '50%', top: '60%' }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-30"></div>
                </div>
              </div>
            )}

            {/* Route Visualization */}
            {showRoute && routeData && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 50% 60% Q 40% 40% 30% 30% Q 60% 50% 70% 40%"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card shadow-lg"
        >
          <Icon name="Plus" size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card shadow-lg"
        >
          <Icon name="Minus" size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={userLocationEnabled ? handleCenterMap : handleLocationRequest}
          className="bg-card shadow-lg"
        >
          <Icon name={userLocationEnabled ? "Navigation" : "MapPin"} size={16} />
        </Button>
      </div>
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card rounded-lg shadow-lg p-3 max-w-48">
        <h4 className="text-sm font-medium mb-2">Legende</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>20+ Angebote</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>10+ Angebote</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>Wenige Angebote</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;