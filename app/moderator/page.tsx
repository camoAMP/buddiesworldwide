'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Store,
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  Mail,
  MessageSquare,
  Calendar,
  MapPin,
  Tag,
  Clock
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data for pending listings
const mockPendingListings = [
  {
    id: "LIST-001",
    product_name: "iPhone 15 Pro Max 256GB",
    seller: "TechDeals SA",
    category: "Electronics",
    price: 24999,
    location: "Cape Town, WC",
    date_submitted: "2025-01-22T10:30:00Z",
    status: "pending",
    images: 5,
    description: "Brand new iPhone 15 Pro Max in box, never opened. Original packaging.",
    reason: "New listing",
    reports: 0
  },
  {
    id: "LIST-002",
    product_name: "Nike Air Max 270",
    seller: "ShoeKingZA",
    category: "Clothing",
    price: 2299,
    location: "Johannesburg, GP",
    date_submitted: "2025-01-22T09:15:00Z",
    status: "pending",
    images: 8,
    description: "Gently used Nike Air Max 270 in excellent condition. Size 9.",
    reason: "New listing",
    reports: 0
  },
  {
    id: "LIST-003",
    product_name: "Custom 3D Printed Action Figure",
    seller: "3DPrintMaster",
    category: "3D Prints",
    price: 899,
    location: "Durban, NL",
    date_submitted: "2025-01-22T08:45:00Z",
    status: "pending",
    images: 3,
    description: "Custom 3D printed action figure, approximately 15cm tall, painted.",
    reason: "New listing",
    reports: 0
  },
  {
    id: "LIST-004",
    product_name: "Toyota Hilux 2.8 D-4D",
    seller: "AutoSalesZA",
    category: "Vehicles",
    price: 485000,
    location: "Port Elizabeth, EC",
    date_submitted: "2025-01-21T16:20:00Z",
    status: "pending",
    images: 12,
    description: "2018 Toyota Hilux 2.8 D-4D with 85,000km. Well maintained, serviced regularly.",
    reason: "New listing",
    reports: 2
  }
];

const mockDisputes = [
  {
    id: "DISP-001",
    order_id: "ORD-98765",
    buyer: "John Smith",
    seller: "TechDeals SA",
    issue: "Item not received",
    status: "open",
    date_opened: "2025-01-20T14:30:00Z",
    description: "Buyer claims they never received the item despite tracking showing delivery confirmation."
  },
  {
    id: "DISP-002",
    order_id: "ORD-98766",
    buyer: "Sarah Johnson",
    seller: "FashionHub",
    issue: "Item damaged",
    status: "investigating",
    date_opened: "2025-01-19T11:15:00Z",
    description: "Received item was damaged during shipping. Photos provided as evidence."
  }
];

const mockStats = {
  pending_listings: 24,
  active_disputes: 8,
  total_revenue: 2456890,
  total_users: 89432,
  total_vendors: 5234,
  weekly_growth: 12.5
};

export default function ModeratorDashboard() {
  const [pendingListings, setPendingListings] = useState<any[]>([]);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch data
    setTimeout(() => {
      setPendingListings(mockPendingListings);
      setDisputes(mockDisputes);
      setStats(mockStats);
      setLoading(false);
    }, 800);
  }, []);

  const approveListing = (id: string) => {
    setPendingListings(prev => prev.filter(listing => listing.id !== id));
    // In a real implementation, this would call the API
    console.log(`Approved listing: ${id}`);
  };

  const rejectListing = (id: string) => {
    setPendingListings(prev => prev.filter(listing => listing.id !== id));
    // In a real implementation, this would call the API
    console.log(`Rejected listing: ${id}`);
  };

  const resolveDispute = (id: string) => {
    setDisputes(prev => prev.filter(dispute => dispute.id !== id));
    // In a real implementation, this would call the API
    console.log(`Resolved dispute: ${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      pending: { variant: "secondary", label: "Pending Review" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
      open: { variant: "secondary", label: "Open" },
      investigating: { variant: "default", label: "Investigating" },
      resolved: { variant: "default", label: "Resolved" },
    };
    const { variant, label } = variants[status] || { variant: "outline", label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Moderator Dashboard</h1>
          <p className="text-muted-foreground">Review and manage listings and disputes</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Listings</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pending_listings}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Disputes</p>
                  <p className="text-2xl font-bold text-foreground">{stats.active_disputes}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">R{stats.total_revenue.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <span>+{stats.weekly_growth}% this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Vendors</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total_vendors.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center">
                  <Store className="h-6 w-6 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="listings">Pending Listings</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>Pending Listings</CardTitle>
                <CardDescription>Review and approve/reject new listings</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingListings.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No pending listings</h3>
                    <p className="text-muted-foreground">All listings have been reviewed</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingListings.map((listing) => (
                      <Card key={listing.id} className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div className="bg-muted rounded-lg w-16 h-16 flex items-center justify-center">
                                <Package className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-foreground">{listing.product_name}</h3>
                                  {listing.reports > 0 && (
                                    <Badge variant="destructive" className="flex items-center gap-1">
                                      <AlertTriangle className="h-3 w-3" />
                                      {listing.reports} reports
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{listing.seller} • {listing.category}</p>
                                <p className="text-sm text-muted-foreground mt-1">{listing.description.substring(0, 80)}{listing.description.length > 80 ? '...' : ''}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Tag className="h-3 w-3" />
                                    {listing.category}
                                  </Badge>
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {listing.location}
                                  </Badge>
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    {listing.images} images
                                  </Badge>
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(listing.date_submitted)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 min-w-[200px]">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1"
                              onClick={() => rejectListing(listing.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={() => approveListing(listing.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Listed: {formatDate(listing.date_submitted)}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-primary">R{listing.price.toLocaleString()}</span>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes">
            <Card>
              <CardHeader>
                <CardTitle>Active Disputes</CardTitle>
                <CardDescription>Manage and resolve user disputes</CardDescription>
              </CardHeader>
              <CardContent>
                {disputes.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No active disputes</h3>
                    <p className="text-muted-foreground">All disputes have been resolved</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {disputes.map((dispute) => (
                      <Card key={dispute.id} className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">#{dispute.id}: {dispute.issue}</h3>
                              {getStatusBadge(dispute.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">Order #{dispute.order_id} • {dispute.buyer} vs {dispute.seller}</p>
                            <p className="text-sm text-muted-foreground mt-1">{dispute.description}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(dispute.date_opened)}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 min-w-[150px]">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1"
                              onClick={() => resolveDispute(dispute.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Contact Buyer
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Contact Seller
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Moderate user accounts and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">User management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Reports</CardTitle>
                <CardDescription>Financial performance and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">Revenue reporting interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}