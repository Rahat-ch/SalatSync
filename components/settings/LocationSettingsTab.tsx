'use client';

import { MapPin, Navigation, Plus, Trash2, Star, StarOff, Edit, Check, X } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useLocation } from '@/contexts/LocationContext';
import { usePreferences } from '@/contexts/PreferencesContext';

export default function LocationSettingsTab() {
  const { preferences, updateLocationSettings } = usePreferences();
  const { location, requestLocation, loading } = useLocation();
  const { location: locationSettings } = preferences;

  const [editingLocation, setEditingLocation] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAddCurrentLocation = () => {
    if (location) {
      const newLocation = {
        id: crypto.randomUUID(),
        name: `${location.city || 'Unknown'}, ${location.country || 'Unknown'}`,
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city || '',
        country: location.country || '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        isDefault: locationSettings.savedLocations.length === 0,
        createdAt: new Date(),
      };

      updateLocationSettings({
        savedLocations: [...locationSettings.savedLocations, newLocation],
      });
    }
  };

  const handleDeleteLocation = (id: string) => {
    const updatedLocations = locationSettings.savedLocations.filter((loc) => loc.id !== id);
    let defaultLocationId = locationSettings.defaultLocationId;

    // If we're deleting the default location, set a new default
    if (defaultLocationId === id && updatedLocations.length > 0) {
      defaultLocationId = updatedLocations[0].id;
    } else if (updatedLocations.length === 0) {
      defaultLocationId = undefined;
    }

    updateLocationSettings({
      savedLocations: updatedLocations,
      defaultLocationId,
    });
  };

  const handleSetDefault = (id: string) => {
    updateLocationSettings({ defaultLocationId: id });
  };

  const handleEditLocation = (id: string, name: string) => {
    setEditingLocation(id);
    setEditingName(name);
  };

  const handleSaveEdit = (id: string) => {
    const updatedLocations = locationSettings.savedLocations.map((loc) =>
      loc.id === id ? { ...loc, name: editingName.trim() || loc.name } : loc
    );

    updateLocationSettings({ savedLocations: updatedLocations });
    setEditingLocation(null);
    setEditingName('');
  };

  const handleCancelEdit = () => {
    setEditingLocation(null);
    setEditingName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="h-5 w-5 text-green-600" />
          Location Settings
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Manage your saved locations for prayer time calculations
        </p>
      </div>

      <Separator />

      {/* Auto-detect Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Navigation className="h-4 w-4" />
            Automatic Location Detection
          </CardTitle>
          <CardDescription>
            Use your device&apos;s GPS to automatically detect your current location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-detect">Auto-detect Location</Label>
                <p className="text-sm text-gray-500">Automatically use GPS when available</p>
              </div>
              <Switch
                id="auto-detect"
                checked={locationSettings.autoDetect}
                onCheckedChange={(checked) => updateLocationSettings({ autoDetect: checked })}
              />
            </div>

            {/* Current Location Status */}
            <div className="rounded-md bg-gray-50 p-3">
              <h4 className="mb-2 text-sm font-medium">Current Location</h4>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-green-600"></div>
                  <span className="text-sm text-gray-600">Detecting location...</span>
                </div>
              ) : location ? (
                <div className="space-y-1">
                  <p className="text-sm">
                    📍 {location.city}, {location.country}
                  </p>
                  <p className="text-xs text-gray-500">
                    Coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddCurrentLocation}
                    className="mt-2"
                    disabled={locationSettings.savedLocations.some(
                      (loc) =>
                        Math.abs(loc.latitude - location.latitude) < 0.01 &&
                        Math.abs(loc.longitude - location.longitude) < 0.01
                    )}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Save Current Location
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="mb-2 text-sm text-gray-600">Location not detected</p>
                  <Button variant="outline" size="sm" onClick={requestLocation}>
                    <Navigation className="mr-1 h-4 w-4" />
                    Detect Location
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Saved Locations</CardTitle>
          <CardDescription>Manage your frequently used locations for quick access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {locationSettings.savedLocations.length === 0 ? (
              <div className="py-8 text-center">
                <MapPin className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <p className="mb-2 text-gray-500">No saved locations yet</p>
                <p className="text-sm text-gray-400">
                  Add locations to quickly switch between different prayer time calculations
                </p>
              </div>
            ) : (
              locationSettings.savedLocations.map((savedLocation) => (
                <Card key={savedLocation.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        {editingLocation === savedLocation.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="flex-1"
                              placeholder="Location name"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit(savedLocation.id);
                                if (e.key === 'Escape') handleCancelEdit();
                              }}
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSaveEdit(savedLocation.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <h4 className="font-medium">{savedLocation.name}</h4>
                              {locationSettings.defaultLocationId === savedLocation.id && (
                                <Badge variant="secondary" className="text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {savedLocation.city}, {savedLocation.country}
                            </p>
                            <p className="text-xs text-gray-400">
                              {savedLocation.latitude.toFixed(4)},{' '}
                              {savedLocation.longitude.toFixed(4)}
                            </p>
                          </div>
                        )}
                      </div>

                      {editingLocation !== savedLocation.id && (
                        <div className="ml-4 flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditLocation(savedLocation.id, savedLocation.name)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSetDefault(savedLocation.id)}
                            className={
                              locationSettings.defaultLocationId === savedLocation.id
                                ? 'text-yellow-600'
                                : ''
                            }
                          >
                            {locationSettings.defaultLocationId === savedLocation.id ? (
                              <Star className="h-4 w-4 fill-current" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteLocation(savedLocation.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {locationSettings.savedLocations.length > 0 && (
            <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> Click the star icon to set a location as your default.
                Click the edit icon to rename a saved location.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
