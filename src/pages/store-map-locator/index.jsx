import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import MapContainer from './components/MapContainer';
import StoreBottomSheet from './components/StoreBottomSheet';
import MapFilterChips from './components/MapFilterChips';
import StoreListSidebar from './components/StoreListSidebar';
import RoutePanel from './components/RoutePanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StoreMapLocator = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [mapFilters, setMapFilters] = useState({});
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 1024);
  const [showRoutePanel, setShowRoutePanel] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [selectedStoresForRoute, setSelectedStoresForRoute] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Mock data for stores
  const mockStores = [
    {
      id: 1,
      name: "REWE Mitte",
      chain: "REWE",
      address: "Friedrichstraße 123, 10117 Berlin",
      distance: 0.3,
      isOpen: true,
      offers: 24,
      phone: "+49 30 12345678",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop",
      openingHours: {
        0: "Geschlossen",
        1: "07:00 - 22:00",
        2: "07:00 - 22:00",
        3: "07:00 - 22:00",
        4: "07:00 - 22:00",
        5: "07:00 - 22:00",
        6: "08:00 - 20:00"
      },
      services: ["Bäckerei", "Metzgerei", "Paketstation"],
      topOffers: [
        {
          product: "Bio Äpfel",
          brand: "REWE Bio",
          price: "2,49€",
          originalPrice: "3,99€",
          image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop"
        },
        {
          product: "Vollmilch",
          brand: "Weihenstephan",
          price: "1,19€",
          originalPrice: "1,49€",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      id: 2,
      name: "EDEKA Center",
      chain: "EDEKA",
      address: "Potsdamer Platz 5, 10785 Berlin",
      distance: 0.8,
      isOpen: true,
      offers: 31,
      phone: "+49 30 87654321",
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      openingHours: {
        0: "Geschlossen",
        1: "08:00 - 22:00",
        2: "08:00 - 22:00",
        3: "08:00 - 22:00",
        4: "08:00 - 22:00",
        5: "08:00 - 22:00",
        6: "08:00 - 20:00"
      },
      services: ["Bäckerei", "Blumen", "Lotto"],
      topOffers: [
        {
          product: "Hackfleisch",
          brand: "EDEKA",
          price: "4,99€",
          originalPrice: "6,99€",
          image: "https://images.unsplash.com/photo-1588347818132-46e9b8e0c4e4?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      id: 3,
      name: "Lidl",
      chain: "Lidl",
      address: "Alexanderplatz 12, 10178 Berlin",
      distance: 1.2,
      isOpen: false,
      offers: 18,
      phone: "+49 30 11223344",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop",
      openingHours: {
        0: "Geschlossen",
        1: "07:00 - 21:30",
        2: "07:00 - 21:30",
        3: "07:00 - 21:30",
        4: "07:00 - 21:30",
        5: "07:00 - 21:30",
        6: "08:00 - 20:00"
      },
      services: ["Bäckerei"],
      topOffers: [
        {
          product: "Bananen",
          brand: "Lidl",
          price: "1,29€",
          originalPrice: "1,79€",
          image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      id: 4,
      name: "ALDI SÜD",
      chain: "ALDI",
      address: "Unter den Linden 45, 10117 Berlin",
      distance: 1.5,
      isOpen: true,
      offers: 12,
      phone: "+49 30 55667788",
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      openingHours: {
        0: "Geschlossen",
        1: "07:00 - 21:00",
        2: "07:00 - 21:00",
        3: "07:00 - 21:00",
        4: "07:00 - 21:00",
        5: "07:00 - 21:00",
        6: "08:00 - 20:00"
      },
      services: [],
      topOffers: [
        {
          product: "Brot",
          brand: "ALDI",
          price: "0,89€",
          originalPrice: "1,19€",
          image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop"
        }
      ]
    },
    {
      id: 5,
      name: "Netto Marken-Discount",
      chain: "Netto",
      address: "Kurfürstendamm 78, 10709 Berlin",
      distance: 2.1,
      isOpen: true,
      offers: 8,
      phone: "+49 30 99887766",
      logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop",
      openingHours: {
        0: "Geschlossen",
        1: "07:00 - 21:00",
        2: "07:00 - 21:00",
        3: "07:00 - 21:00",
        4: "07:00 - 21:00",
        5: "07:00 - 21:00",
        6: "08:00 - 20:00"
      },
      services: ["Paketstation"],
      topOffers: [
        {
          product: "Joghurt",
          brand: "Netto",
          price: "0,49€",
          originalPrice: "0,69€",
          image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=100&h=100&fit=crop"
        }
      ]
    }
  ];

  // Mock store chains data
  const mockStoreChains = [
    { id: "REWE", name: "REWE", storeCount: 12, logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=50&h=50&fit=crop" },
    { id: "EDEKA", name: "EDEKA", storeCount: 8, logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=50&h=50&fit=crop" },
    { id: "Lidl", name: "Lidl", storeCount: 15, logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=50&h=50&fit=crop" },
    { id: "ALDI", name: "ALDI", storeCount: 10, logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=50&h=50&fit=crop" },
    { id: "Netto", name: "Netto", storeCount: 6, logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=50&h=50&fit=crop" }
  ];

  // Mock route data
  const mockRouteData = {
    totalDuration: 45,
    totalDistance: 3.2,
    estimatedCost: 2.50,
    potentialSavings: 15.80,
    steps: [
      {
        instruction: "Fahren Sie 300m geradeaus auf der Friedrichstraße",
        distance: 0.3,
        duration: 2
      },
      {
        instruction: "Biegen Sie rechts ab auf die Unter den Linden",
        distance: 0.8,
        duration: 5
      },
      {
        instruction: "Ihr Ziel befindet sich auf der rechten Seite",
        distance: 0.1,
        duration: 1
      }
    ]
  };

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Handle window resize
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setIsBottomSheetOpen(true);
  };

  const handleStoreHover = (store) => {
    // Highlight store on map
    console.log('Hovering over store:', store?.name);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setTimeout(() => {
      setSelectedStore(null);
    }, 300);
  };

  const handleViewOffers = (store) => {
    navigate('/local-offers-browse', { 
      state: { storeId: store?.id, storeName: store?.name } 
    });
  };

  const handleGetDirections = (store) => {
    setSelectedStoresForRoute([store]);
    setRouteData(mockRouteData);
    setShowRoutePanel(true);
  };

  const handleStartRoute = (store) => {
    // Start navigation to single store
    console.log('Starting route to:', store?.name);
    alert(`Navigation zu ${store?.name} gestartet!`);
  };

  const handleStartNavigation = (routeData) => {
    console.log('Starting navigation with route data:', routeData);
    alert('Navigation gestartet!');
  };

  const handleOptimizeRoute = (stores, routeType) => {
    console.log('Optimizing route for stores:', stores, 'Type:', routeType);
    // Mock optimization
    setRouteData({
      ...mockRouteData,
      totalDuration: mockRouteData?.totalDuration - 5,
      estimatedCost: mockRouteData?.estimatedCost - 0.30
    });
  };

  const handleFilterChange = (newFilters) => {
    setMapFilters(newFilters);
  };

  const handleMapReady = () => {
    console.log('Map is ready');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const getFilteredStores = () => {
    let filtered = mockStores;

    if (mapFilters?.chains && mapFilters?.chains?.length > 0) {
      filtered = filtered?.filter(store => mapFilters?.chains?.includes(store?.chain));
    }

    if (mapFilters?.radius) {
      filtered = filtered?.filter(store => store?.distance <= parseFloat(mapFilters?.radius));
    }

    return filtered;
  };

  const filteredStores = getFilteredStores();
  const activeFilterCount = Object.keys(mapFilters)?.reduce((count, key) => {
    if (Array.isArray(mapFilters?.[key])) {
      return count + mapFilters?.[key]?.length;
    }
    return mapFilters?.[key] ? count + 1 : count;
  }, 0);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header - Hidden on mobile for full-screen map */}
      <div className="hidden md:block">
        <Header />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Desktop Sidebar */}
        {showSidebar && (
          <StoreListSidebar
            stores={filteredStores}
            selectedStore={selectedStore}
            onStoreSelect={handleStoreSelect}
            onStoreHover={handleStoreHover}
            filters={mapFilters}
            isVisible={showSidebar}
          />
        )}

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer
            stores={filteredStores}
            selectedStore={selectedStore}
            onStoreSelect={handleStoreSelect}
            userLocation={userLocation}
            showRoute={showRoutePanel}
            routeData={routeData}
            mapFilters={mapFilters}
            onMapReady={handleMapReady}
          />

          {/* Filter Chips Overlay */}
          <MapFilterChips
            filters={mapFilters}
            onFilterChange={handleFilterChange}
            storeChains={mockStoreChains}
            totalStores={mockStores?.length}
            visibleStores={filteredStores?.length}
          />

          {/* Mobile Controls */}
          <div className="md:hidden absolute top-4 left-4 z-30">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="bg-card shadow-lg"
            >
              <Icon name="List" size={20} />
            </Button>
          </div>
        </div>

        {/* Route Panel */}
        {showRoutePanel && (
          <RoutePanel
            isVisible={showRoutePanel}
            onClose={() => setShowRoutePanel(false)}
            routeData={routeData}
            onStartNavigation={handleStartNavigation}
            onOptimizeRoute={handleOptimizeRoute}
            selectedStores={selectedStoresForRoute}
          />
        )}
      </div>
      {/* Mobile Bottom Sheet */}
      <StoreBottomSheet
        store={selectedStore}
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onViewOffers={handleViewOffers}
        onGetDirections={handleGetDirections}
        onStartRoute={handleStartRoute}
      />
      {/* Bottom Navigation - Mobile Only */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default StoreMapLocator;