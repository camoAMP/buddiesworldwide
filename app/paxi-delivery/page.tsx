'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Package, Truck, CreditCard, CheckCircle } from 'lucide-react';
import PaxiStoreLocator from '@/components/paxi-store-locator';

export default function PaxiDeliveryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Truck className="h-4 w-4" />
            PAXI Delivery
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">PAXI Store-to-Store Delivery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your nearest PAXI pickup point and enjoy convenient, secure delivery across South Africa
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaxiStoreLocator />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Why PAXI?
                </CardTitle>
                <CardDescription>Safe and convenient delivery options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">2800+ Locations</h4>
                    <p className="text-sm text-muted-foreground">Across South Africa</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">R59.95 Rate</h4>
                    <p className="text-sm text-muted-foreground">Flat rate nationwide</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Real-time tracking</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Secure Collection</h4>
                    <p className="text-sm text-muted-foreground">PIN-protected pickup</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Delivery Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-center flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mx-auto mb-2">
                      1
                    </div>
                    <p className="text-sm font-medium">Select Store</p>
                  </div>
                  <div className="text-center flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mx-auto mb-2">
                      2
                    </div>
                    <p className="text-sm font-medium">Make Payment</p>
                  </div>
                  <div className="text-center flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mx-auto mb-2">
                      3
                    </div>
                    <p className="text-sm font-medium">Collect Parcel</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment & Security</CardTitle>
                <CardDescription>Secure transactions with escrow protection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span className="font-medium">R10.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">PAXI Delivery</span>
                    <span className="font-medium">R59.95</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total Est.</span>
                      <span>R69.95 + 8% of item cost</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-3">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Payment held in escrow until pickup confirmed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}