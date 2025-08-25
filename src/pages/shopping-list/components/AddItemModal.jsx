import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('Stück');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const unitOptions = [
    { value: 'Stück', label: 'Stück' },
    { value: 'kg', label: 'Kilogramm' },
    { value: 'g', label: 'Gramm' },
    { value: 'l', label: 'Liter' },
    { value: 'ml', label: 'Milliliter' },
    { value: 'Packung', label: 'Packung' },
  ];

  const categoryOptions = [
    { value: 'obst-gemuese', label: 'Obst & Gemüse' },
    { value: 'fleisch-fisch', label: 'Fleisch & Fisch' },
    { value: 'milchprodukte', label: 'Milchprodukte' },
    { value: 'backwaren', label: 'Backwaren' },
    { value: 'konserven', label: 'Konserven' },
    { value: 'getraenke', label: 'Getränke' },
    { value: 'sonstiges', label: 'Sonstiges' },
  ];

  const mockSuggestions = [
    'Milch 1,5% Fett',
    'Vollkornbrot',
    'Bananen',
    'Hähnchenbrust',
    'Joghurt natur',
    'Tomaten',
    'Käse Gouda',
    'Eier Freiland',
  ];

  const handleItemNameChange = (e) => {
    const value = e?.target?.value;
    setItemName(value);
    
    if (value?.length > 1) {
      const filtered = mockSuggestions?.filter(item =>
        item?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setItemName(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!itemName?.trim()) return;

    const newItem = {
      id: Date.now(),
      name: itemName?.trim(),
      quantity,
      unit,
      category: category || 'sonstiges',
      note: note?.trim(),
      completed: false,
      price: 0,
      originalPrice: 0,
      store: 'Manuell hinzugefügt',
      hasOffer: false,
    };

    onAdd(newItem);
    
    // Reset form
    setItemName('');
    setQuantity(1);
    setUnit('Stück');
    setCategory('');
    setNote('');
    setSuggestions([]);
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-400 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-t-2xl sm:rounded-2xl border border-border max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Artikel hinzufügen
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
          {/* Item Name with Suggestions */}
          <div className="relative">
            <Input
              label="Artikelname"
              type="text"
              placeholder="z.B. Milch, Brot, Bananen..."
              value={itemName}
              onChange={handleItemNameChange}
              required
            />
            
            {/* Suggestions */}
            {suggestions?.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-popover border border-border rounded-lg shadow-elevated z-10 mt-1">
                {suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Menge"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e?.target?.value) || 1)}
              required
            />
            
            <Select
              label="Einheit"
              options={unitOptions}
              value={unit}
              onChange={setUnit}
            />
          </div>

          {/* Category */}
          <Select
            label="Kategorie"
            placeholder="Kategorie wählen (optional)"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
          />

          {/* Note */}
          <Input
            label="Notiz"
            type="text"
            placeholder="Zusätzliche Informationen (optional)"
            value={note}
            onChange={(e) => setNote(e?.target?.value)}
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
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Hinzufügen
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;