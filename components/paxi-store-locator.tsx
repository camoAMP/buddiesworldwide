'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Search, 
  Package, 
  CheckCircle, 
  AlertTriangle,
  Navigation
} from 'lucide-react';

interface PaxiStore {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  operating_hours: string;
  phone: string;
  distance_km: number;
}

interface Location {
  lat: number;
  lng: number;
}

export default function PaxiStoreLocator() {
  const [stores, setStores] = useState<PaxiStore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<PaxiStore | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Use a default location for Cape Town
          setUserLocation({ lat: -33.9249, lng: 18.4241 });
        }
      );
    } else {
      // Use a default location for Cape Town
      setUserLocation({ lat: -33.9249, lng: 18.4241 });
    }
  }, []);

  const fetchStores = async () => {
    if (!userLocation) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/paxi?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=50`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch PAXI stores');
      }

      const data = await response.json();
      setStores(data.stores);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetchStores();
    }
  }, [userLocation]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/paxi?address=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        throw new Error('Failed to search for PAXI stores');
      }

      const data = await response.json();
      setStores(data.stores);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStore = (store: PaxiStore) => {
    setSelectedStore(store);
  };

  const handleConfirmSelection = () => {
    if (selectedStore) {
      // In a real implementation, this would save the selection
      console.log('Selected store:', selectedStore);
      alert(`Selected PAXI store: ${selectedStore.name}. This information will be used for your delivery.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Find PAXI Store</h2>
        <p className="text-muted-foreground mb-4">
          Select a nearby PAXI pickup point for your order. Over 2800 locations across South Africa.
        </p>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by suburb, city, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </div>

      {error && (
        <Card className="border-red-500">
          <CardContent className="p-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available PAXI Stores</h3>
          
          {stores.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No PAXI stores found. Try another location.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {stores.map((store) => (
                <Card 
                  key={store.id} 
                  className={`transition-all ${
                    selectedStore?.id === store.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:shadow-md cursor-pointer'
                  }`}
                  onClick={() => handleSelectStore(store)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{store.name}</CardTitle>
                      <Badge variant="secondary">{store.distance_km.toFixed(1)} km</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">{store.address}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{store.operating_hours}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{store.phone}</p>
                      </div>
                      
                      <div className="pt-2">
                        {selectedStore?.id === store.id ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Selected</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedStore && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Selected Store
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h4 className="font-semibold">{selectedStore.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedStore.address}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedStore(null)}>
                  Change Store
                </Button>
                <Button onClick={handleConfirmSelection}>
                  Confirm Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Navigation className="h-4 w-4" />
          How PAXI Delivery Works
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Select your nearest PAXI store during checkout</li>
          <li>• Receive SMS notification when your order arrives at the store</li>
          <li>• Collect your order using your ID and collection PIN</li>
          <li>• Standard rate: R59.95 nationwide (store-to-store)</li>
        </ul>
      </div>
    </div>
  );
}