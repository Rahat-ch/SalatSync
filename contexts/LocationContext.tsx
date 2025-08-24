'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

interface LocationContextType {
  location: Location | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
  setManualLocation: (location: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        });
      });

      const { latitude, longitude } = position.coords;

      // Try to get city name using reverse geocoding
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();

        setLocation({
          latitude,
          longitude,
          city: data.city || data.locality,
          country: data.countryName,
        });
      } catch {
        // If reverse geocoding fails, just use coordinates
        setLocation({ latitude, longitude });
      }
    } catch (error: any) {
      const message =
        error.code === 1
          ? 'Location access denied. Please enable location permissions.'
          : 'Unable to retrieve your location. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const setManualLocation = (newLocation: Location) => {
    setLocation(newLocation);
    setError(null);
  };

  // Try to get saved location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('salatsync-location');
    if (savedLocation) {
      try {
        setLocation(JSON.parse(savedLocation));
      } catch {
        localStorage.removeItem('salatsync-location');
      }
    }
  }, []);

  // Save location to localStorage when it changes
  useEffect(() => {
    if (location) {
      localStorage.setItem('salatsync-location', JSON.stringify(location));
    }
  }, [location]);

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        error,
        requestLocation,
        setManualLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
