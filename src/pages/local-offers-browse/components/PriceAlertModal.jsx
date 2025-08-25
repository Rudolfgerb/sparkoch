import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PriceAlertModal = ({ isOpen, onClose, offer, onSetAlert }) => {
  const [alertPrice, setAlertPrice] = useState('');
  const [alertType, setAlertType] = useState('below');
  const [notificationMethod, setNotificationMethod] = useState('push');

  const alertTypeOptions = [
    { value: 'below', label: 'Preis fällt unter' },
    { value: 'above', label: 'Preis steigt über' },
    { value: 'change', label: 'Bei jeder Preisänderung' }
  ];

  const notificationOptions = [
    { value: 'push', label: 'Push-Benachrichtigung' },
    { value: 'email', label: 'E-Mail' },
    { value: 'both', label: 'Push + E-Mail' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSetAlert({
      offerId: offer?.id,
      alertPrice: parseFloat(alertPrice),
      alertType,
      notificationMethod
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-400 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevated w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Preisalarm einrichten
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Product Info */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-background rounded-lg overflow-hidden">
              <img 
                src={offer?.image} 
                alt={offer?.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-sm">
                {offer?.productName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Aktueller Preis: {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR'
                })?.format(offer?.discountedPrice || 0)}
              </p>
            </div>
          </div>

          {/* Alert Type */}
          <Select
            label="Alarm-Typ"
            options={alertTypeOptions}
            value={alertType}
            onChange={setAlertType}
            required
          />

          {/* Alert Price */}
          {alertType !== 'change' && (
            <Input
              label="Zielpreis"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={alertPrice}
              onChange={(e) => setAlertPrice(e?.target?.value)}
              description="Geben Sie den gewünschten Preis in Euro ein"
              required
            />
          )}

          {/* Notification Method */}
          <Select
            label="Benachrichtigung"
            options={notificationOptions}
            value={notificationMethod}
            onChange={setNotificationMethod}
            required
          />

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
              iconName="Bell"
              iconPosition="left"
              iconSize={16}
            >
              Alarm erstellen
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceAlertModal;