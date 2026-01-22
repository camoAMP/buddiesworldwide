import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract search parameters for PAXI store locations
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "10"; // Default to 10km radius
  const address = searchParams.get("address");

  // In a real implementation, this would connect to the PAXI API
  // For now, we'll return mock data representing PAXI stores in South Africa
  const mockStores = [
    {
      id: "paxi-ct-001",
      name: "PAXI Green Point",
      address: "Shop G11, The Bay, 31 Beach Road, Green Point, Cape Town, 8001",
      lat: -33.8724,
      lng: 18.3820,
      operating_hours: "Mon-Fri: 8AM-6PM, Sat: 8AM-2PM, Sun: Closed",
      phone: "+27 21 123 4567",
      distance_km: 2.5,
    },
    {
      id: "paxi-ct-002",
      name: "PAXI V&A Waterfront",
      address: "Shop 11, Lower Level, V&A Food Market, Vredehoek, Cape Town, 8001",
      lat: -33.9049,
      lng: 18.4199,
      operating_hours: "Mon-Sat: 9AM-7PM, Sun: 9AM-5PM",
      phone: "+27 21 123 4568",
      distance_km: 1.2,
    },
    {
      id: "paxi-ct-003",
      name: "PAXI Bellville",
      address: "Shop 31, Bellville Square, cnr. Klipfontein & Voortrekker Road, Bellville, 7530",
      lat: -33.8795,
      lng: 18.6096,
      operating_hours: "Mon-Fri: 8AM-6PM, Sat: 8AM-2PM, Sun: Closed",
      phone: "+27 21 123 4569",
      distance_km: 12.8,
    },
    {
      id: "paxi-jhb-001",
      name: "PAXI Sandton City",
      address: "Shop F17, Ground Floor, Sandton City, Grayston Drive, Sandton, Johannesburg, 2196",
      lat: -26.1036,
      lng: 28.0369,
      operating_hours: "Mon-Sat: 9AM-7PM, Sun: 9AM-5PM",
      phone: "+27 11 123 4570",
      distance_km: 0.0,
    },
    {
      id: "paxi-jhb-002",
      name: "PAXI Rosebank",
      address: "Shop 10, Lower Level, Pick n Pay, Cnr. Oxford & Bath Road, Rosebank, Johannesburg, 2196",
      lat: -26.1430,
      lng: 28.0311,
      operating_hours: "Mon-Fri: 8AM-6PM, Sat: 8AM-2PM, Sun: Closed",
      phone: "+27 11 123 4571",
      distance_km: 4.3,
    },
  ];

  // Filter stores based on search criteria
  let filteredStores = mockStores;

  if (lat && lng) {
    // In a real implementation, we'd calculate actual distances
    // Here we just return all stores but sorted by distance
    filteredStores = [...mockStores].sort((a, b) => a.distance_km - b.distance_km);
  }

  if (address) {
    // In a real implementation, we'd geocode the address
    // For now, just return all stores
    filteredStores = [...mockStores];
  }

  return NextResponse.json({ stores: filteredStores });
}

export async function POST(request: NextRequest) {
  // Handle creating a PAXI shipment
  const body = await request.json();
  
  const { 
    sender_name, 
    sender_phone, 
    recipient_name, 
    recipient_phone, 
    recipient_store_id, 
    parcel_weight_kg,
    collection_pin,
    order_id 
  } = body;

  // Validate required fields
  if (!sender_name || !sender_phone || !recipient_name || !recipient_phone || !recipient_store_id) {
    return NextResponse.json(
      { error: "Missing required fields: sender_name, sender_phone, recipient_name, recipient_phone, recipient_store_id" },
      { status: 400 }
    );
  }

  // In a real implementation, this would connect to the PAXI API
  // For now, we'll return mock data
  const mockShipment = {
    shipment_id: `BW-${Math.floor(Math.random() * 1000000)}`,
    tracking_number: `PAXI-${Math.floor(Math.random() * 10000000)}`,
    collection_pin: collection_pin || Math.floor(100000 + Math.random() * 900000), // 6-digit pin
    sender: {
      name: sender_name,
      phone: sender_phone,
    },
    recipient: {
      name: recipient_name,
      phone: recipient_phone,
    },
    store: {
      id: recipient_store_id,
      name: "PAXI Store Name",
      address: "Store Address",
    },
    weight_kg: parcel_weight_kg || 1.0,
    order_id,
    status: "created",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  };

  return NextResponse.json({ shipment: mockShipment });
}

export async function PUT(request: NextRequest) {
  // Handle updating a PAXI shipment status
  const body = await request.json();
  const { tracking_number, status } = body;

  if (!tracking_number || !status) {
    return NextResponse.json(
      { error: "Missing required fields: tracking_number, status" },
      { status: 400 }
    );
  }

  // In a real implementation, this would update the shipment via PAXI API
  // For now, return a success response
  return NextResponse.json({
    success: true,
    message: `Shipment ${tracking_number} status updated to ${status}`,
  });
}