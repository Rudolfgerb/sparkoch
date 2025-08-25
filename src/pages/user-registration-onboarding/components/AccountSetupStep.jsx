import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AccountSetupStep = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    return password?.length >= 8;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleContinue = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'E-Mail-Adresse ist erforderlich';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Passwort ist erforderlich';
    } else if (!validatePassword(formData?.password)) {
      newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwort bestätigen ist erforderlich';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
    }
    
    if (!formData?.firstName) {
      newErrors.firstName = 'Vorname ist erforderlich';
    }
    
    if (!formData?.lastName) {
      newErrors.lastName = 'Nachname ist erforderlich';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors)?.length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="UserPlus" size={32} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Konto erstellen</h1>
        <p className="text-muted-foreground">
          Erstellen Sie Ihr SparKoch-Konto für personalisierte Rezepte und Angebote
        </p>
      </div>
      {/* Form */}
      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Vorname"
            type="text"
            placeholder="Max"
            value={formData?.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Nachname"
            type="text"
            placeholder="Mustermann"
            value={formData?.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        {/* Email */}
        <Input
          label="E-Mail-Adresse"
          type="email"
          placeholder="max.mustermann@email.de"
          value={formData?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="Wir verwenden Ihre E-Mail für Anmeldung und wichtige Updates"
          required
        />

        {/* Password */}
        <div className="relative">
          <Input
            label="Passwort"
            type={showPassword ? "text" : "password"}
            placeholder="Mindestens 8 Zeichen"
            value={formData?.password || ''}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {/* Confirm Password */}
        <Input
          label="Passwort bestätigen"
          type="password"
          placeholder="Passwort wiederholen"
          value={formData?.confirmPassword || ''}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
      </div>
      {/* Continue Button */}
      <div className="pt-4">
        <Button
          variant="default"
          onClick={handleContinue}
          fullWidth
          iconName="ChevronRight"
          iconPosition="right"
          iconSize={20}
          className="h-12"
        >
          Weiter
        </Button>
      </div>
      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Haben Sie bereits ein Konto?{' '}
          <button className="text-primary hover:underline font-medium">
            Hier anmelden
          </button>
        </p>
      </div>
    </div>
  );
};

export default AccountSetupStep;