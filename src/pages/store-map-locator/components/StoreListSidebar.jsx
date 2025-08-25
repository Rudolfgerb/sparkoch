import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const StoreListSidebar = ({ 
  stores = [], 
  selectedStore = null, 
  onStoreSelect, 
  onStoreHover,
  filters = {},
  isVisible = true 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance'); // distance, offers, name

  const handleSearch = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const handleStoreClick = (store) => {
    if (onStoreSelect) {
      onStoreSelect(store);
    }
  };

  const handleStoreMouseEnter = (store) => {
    if (onStoreHover) {
      onStoreHover(store);
    }
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance?.toFixed(1)}km`;
  };

  const getStoreStatusColor = (isOpen) => {
    return isOpen ? 'text-success' : 'text-error';
  };

  const sortStores = (stores) => {
    return [...stores]?.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a?.distance - b?.distance;
        case 'offers':
          return b?.offers - a?.offers;
        case 'name':
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });
  };

  const filterStores = (stores) => {
    let filtered = stores;

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(store =>
        store?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        store?.chain?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        store?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Chain filter
    if (filters?.chains && filters?.chains?.length > 0) {
      filtered = filtered?.filter(store => filters?.chains?.includes(store?.chain));
    }

    // Radius filter
    if (filters?.radius) {
      filtered = filtered?.filter(store => store?.distance <= parseFloat(filters?.radius));
    }

    return filtered;
  };

  const filteredAndSortedStores = sortStores(filterStores(stores));

  if (!isVisible) return null;

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Geschäfte</h2>
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedStores?.length} gefunden
          </div>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Geschäfte suchen..."
          value={searchQuery}
          onChange={handleSearch}
          className="mb-3"
        />

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sortieren:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm bg-background border border-border rounded px-2 py-1"
          >
            <option value="distance">Entfernung</option>
            <option value="offers">Angebote</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      {/* Store List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAndSortedStores?.length === 0 ? (
          <div className="p-4 text-center">
            <Icon name="MapPin" size={48} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Keine Geschäfte gefunden</p>
            <p className="text-sm text-muted-foreground mt-1">
              Versuchen Sie andere Suchkriterien
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {filteredAndSortedStores?.map((store) => (
              <div
                key={store?.id}
                onClick={() => handleStoreClick(store)}
                onMouseEnter={() => handleStoreMouseEnter(store)}
                className={`p-3 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                  selectedStore?.id === store?.id
                    ? 'bg-primary/10 border border-primary' :'bg-background hover:bg-accent border border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Store Logo */}
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    <Image
                      src={store?.logo}
                      alt={`${store?.name} Logo`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  {/* Store Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">{store?.name}</h3>
                      {store?.offers > 0 && (
                        <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full ml-2 flex-shrink-0">
                          {store?.offers}
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground mb-2 truncate">
                      {store?.chain}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} className="text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {formatDistance(store?.distance)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} className="text-muted-foreground" />
                          <span className={getStoreStatusColor(store?.isOpen)}>
                            {store?.isOpen ? 'Geöffnet' : 'Geschlossen'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {store?.address}
                    </p>

                    {/* Top Offers Preview */}
                    {store?.topOffers && store?.topOffers?.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-muted rounded overflow-hidden">
                            <Image
                              src={store?.topOffers?.[0]?.image}
                              alt={store?.topOffers?.[0]?.product}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">
                              {store?.topOffers?.[0]?.product}
                            </p>
                            <p className="text-xs text-primary font-medium">
                              {store?.topOffers?.[0]?.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Tag"
                    iconPosition="left"
                    iconSize={12}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    Angebote
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Navigation"
                    iconPosition="left"
                    iconSize={12}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    Route
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreListSidebar;