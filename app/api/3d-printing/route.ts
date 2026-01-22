import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const material = formData.get('material') as string;
  const quantity = formData.get('quantity') as string;
  const color = formData.get('color') as string;

  if (!file || !name) {
    return NextResponse.json(
      { error: "Missing required fields: file, name" },
      { status: 400 }
    );
  }

  // Validate file type
  const allowedTypes = ['application/octet-stream', 'model/stl', 'model/obj', 'model/fbx'];
  if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.stl') && 
      !file.name.toLowerCase().endsWith('.obj') && !file.name.toLowerCase().endsWith('.fbx')) {
    return NextResponse.json(
      { error: "Invalid file type. Only STL, OBJ, and FBX files are allowed." },
      { status: 400 }
    );
  }

  // Validate file size (max 50MB)
  if (file.size > 50 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File size too large. Maximum size is 50MB." },
      { status: 400 }
    );
  }

  // In a real implementation, we would:
  // 1. Upload the file to storage (Backblaze B2)
  // 2. Calculate volume using CuraEngine
  // 3. Generate quote based on material, volume, and complexity
  // 4. Create a print job record
  // For now, we'll return mock data

  // Mock calculation: estimate price based on complexity
  const volumeEstimate = (file.size / 1024 / 1024).toFixed(2); // MB as proxy for volume
  const basePrice = 150; // R150 base
  const volumePrice = parseFloat(volumeEstimate) * 50; // R50 per MB/volume
  const materialMultiplier = material === 'premium' ? 1.5 : material === 'standard' ? 1.2 : 1.0;
  const totalPrice = (basePrice + volumePrice) * materialMultiplier;

  // Create a mock print job
  const mockPrintJob = {
    id: `print_${Math.random().toString(36).substr(2, 9)}`,
    user_id: user.id,
    name,
    description: description || '',
    material: material || 'standard',
    quantity: parseInt(quantity) || 1,
    color: color || 'white',
    file_name: file.name,
    file_size: file.size,
    volume_estimate_cm3: volumeEstimate,
    estimated_cost: totalPrice,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    paxi_delivery: true, // All 3D prints use PAXI delivery
  };

  // In a real implementation, we would store this in the database
  // and potentially trigger a background job to process the 3D model

  return NextResponse.json({ print_job: mockPrintJob });
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id") || user.id;
  const status = searchParams.get("status"); // filter by status

  // In a real implementation, this would query the database for print jobs
  // For now, we'll return mock data
  const mockPrintJobs = [
    {
      id: `job_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      name: "Custom Phone Case",
      description: "Personalized phone case with name engraving",
      material: "standard",
      quantity: 1,
      color: "black",
      volume_estimate_cm3: "12.5",
      estimated_cost: 245.50,
      status: status || "completed",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      updated_at: new Date().toISOString(),
      tracking_number: `PAXI-${Math.floor(10000000 + Math.random() * 90000000)}`,
      paxi_delivery: true,
    },
    {
      id: `job_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      name: "Miniature Chess Set",
      description: "Detailed miniature chess pieces",
      material: "premium",
      quantity: 1,
      color: "multicolor",
      volume_estimate_cm3: "32.1",
      estimated_cost: 850.75,
      status: status || "printing",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      updated_at: new Date().toISOString(),
      tracking_number: null,
      paxi_delivery: true,
    }
  ];

  // Filter by status if provided
  let filteredJobs = mockPrintJobs;
  if (status) {
    filteredJobs = mockPrintJobs.filter(job => job.status === status);
  }

  return NextResponse.json({ print_jobs: filteredJobs });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  
  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { jobId, status } = body;

  if (!jobId || !status) {
    return NextResponse.json(
      { error: "Missing required fields: jobId, status" },
      { status: 400 }
    );
  }

  // In a real implementation, this would update the print job status in the database
  // For now, we'll return a success response

  return NextResponse.json({
    success: true,
    message: `Print job ${jobId} status updated to ${status}`,
    updated_at: new Date().toISOString(),
  });
}