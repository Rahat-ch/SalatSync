'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

interface LocationInputProps {
  onLocationSet: (location: Location) => void;
  loading?: boolean;
}

export function LocationInput({ onLocationSet, loading = false }: LocationInputProps) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = async () => {
    if (!query.trim()) return;

    setSearching(true);
    setError(null);

    try {
      // Use OpenStreetMap Nominatim API for geocoding (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error('Failed to search location');
      }

      const data = await response.json();

      if (data.length === 0) {
        setError('Location not found. Please try a different search term.');
        return;
      }

      const result = data[0];
      const location: Location = {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        city:
          result.address?.city ||
          result.address?.town ||
          result.address?.village ||
          result.display_name.split(',')[0],
        country: result.address?.country,
      };

      onLocationSet(location);
    } catch (error) {
      console.error('Error searching location:', error);
      setError('Failed to search location. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocation();
  };

  return (
    <Card className="islamic-card mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="font-elegant text-2xl">Set Your Location</CardTitle>
        <CardDescription>Enter your city name to get accurate prayer times</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter city name (e.g., New York, London, Dubai)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={searching || loading}
              className="flex-1"
            />
            <Button type="submit" disabled={!query.trim() || searching || loading} className="px-4">
              {searching ? (
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="text-muted-foreground text-center text-xs">
            Examples: &quot;New York&quot;, &quot;London, UK&quot;, &quot;Dubai, UAE&quot;,
            &quot;Istanbul, Turkey&quot;
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
