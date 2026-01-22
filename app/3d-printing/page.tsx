'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Download, 
  File, 
  Ruler, 
  Palette, 
  Settings,
  Package,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function Printing3DPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [quote, setQuote] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'quote' | 'jobs'>('upload');
  const [printJobs, setPrintJobs] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    material: "standard",
    quantity: "1",
    color: "white"
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch user's print jobs
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/3d-printing');
        const data = await response.json();
        setPrintJobs(data.print_jobs);
      } catch (error) {
        console.error('Error fetching print jobs:', error);
      }
    };
    
    fetchJobs();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      if (!file.name.toLowerCase().endsWith('.stl') && 
          !file.name.toLowerCase().endsWith('.obj') && 
          !file.name.toLowerCase().endsWith('.fbx')) {
        alert('Only STL, OBJ, and FBX files are supported.');
        return;
      }

      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('File size exceeds 50MB limit.');
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(file.size);
      
      // Create a preview URL for the file
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    
    if (file) {
      // Reuse the validation and setting logic
      if (!file.name.toLowerCase().endsWith('.stl') && 
          !file.name.toLowerCase().endsWith('.obj') && 
          !file.name.toLowerCase().endsWith('.fbx')) {
        alert('Only STL, OBJ, and FBX files are supported.');
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        alert('File size exceeds 50MB limit.');
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(file.size);
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateQuote = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    
    // In a real implementation, this would send the file to the API for analysis
    // For now, we'll calculate a mock quote
    const fileSizeMB = fileInputRef.current?.files?.[0]?.size ? 
      fileInputRef.current.files[0].size / (1024 * 1024) : 0;
    
    // Mock calculation
    const basePrice = 150; // R150 base
    const volumePrice = fileSizeMB * 50; // R50 per MB/volume
    const materialMultiplier = formData.material === 'premium' ? 1.5 : 
                             formData.material === 'standard' ? 1.2 : 1.0;
    const quantity = parseInt(formData.quantity) || 1;
    const totalPrice = (basePrice + volumePrice) * materialMultiplier * quantity;
    
    setQuote(parseFloat(totalPrice.toFixed(2)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('material', formData.material);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('color', formData.color);
      
      const response = await fetch('/api/3d-printing', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit print job');
      }
      
      const result = await response.json();
      console.log('Print job created:', result);
      
      // Reset form
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSelectedFile(null);
      setFileName("");
      setFileSize(0);
      setPreviewUrl(null);
      setQuote(null);
      setFormData({
        name: "",
        description: "",
        material: "standard",
        quantity: "1",
        color: "white"
      });
      
      // Refresh jobs
      const jobsResponse = await fetch('/api/3d-printing');
      const jobsData = await jobsResponse.json();
      setPrintJobs(jobsData.print_jobs);
      
      setActiveTab('jobs');
      alert('3D print job submitted successfully!');
    } catch (error) {
      console.error('Error submitting print job:', error);
      alert('Failed to submit print job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'printing':
        return <Badge variant="default"><Settings className="h-3 w-3 mr-1" /> Printing</Badge>;
      case 'printed':
        return <Badge variant="default"><Package className="h-3 w-3 mr-1" /> Printed</Badge>;
      case 'shipped':
        return <Badge variant="default"><Package className="h-3 w-3 mr-1" /> Shipped</Badge>;
      case 'completed':
        return <Badge variant="secondary"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>;
      default:
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Error</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Ruler className="h-4 w-4" />
            3D Printing Service
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Print-on-Demand 3D Printing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your 3D model and get it printed with our high-quality printers. 
            Choose from various materials and colors, then pick up at your nearest PAXI location.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex border-b border-border">
                  <button 
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'upload' 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setActiveTab('upload')}
                  >
                    Upload Model
                  </button>
                  <button 
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'quote' 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setActiveTab('quote')}
                  >
                    Get Quote
                  </button>
                  <button 
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'jobs' 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setActiveTab('jobs')}
                  >
                    My Jobs
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === 'upload' && (
                  <div className="space-y-6">
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground mb-2">
                        Drop your 3D model here
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Supports STL, OBJ, and FBX formats (Max 50MB)
                      </p>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Select File
                      </Button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".stl,.obj,.fbx" 
                        onChange={handleFileChange}
                      />
                    </div>

                    {selectedFile && (
                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <File className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-medium">{fileName}</p>
                              <p className="text-sm text-muted-foreground">{formatBytes(fileSize)}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (previewUrl) URL.revokeObjectURL(previewUrl);
                              setSelectedFile(null);
                              setFileName("");
                              setFileSize(0);
                              setPreviewUrl(null);
                              if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                          >
                            Remove
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Model Name *</Label>
                            <Input 
                              id="name" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleInputChange} 
                              placeholder="e.g., Custom Phone Case" 
                              required 
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description" 
                              name="description" 
                              value={formData.description} 
                              onChange={handleInputChange} 
                              placeholder="Describe your model..." 
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="material">Material</Label>
                            <Select 
                              value={formData.material} 
                              onValueChange={(value) => handleSelectChange(value, 'material')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select material" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard (PLA) - R0.00</SelectItem>
                                <SelectItem value="premium">Premium (ABS) - +50%</SelectItem>
                                <SelectItem value="flexible">Flexible (TPU) - +75%</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input 
                              id="quantity" 
                              name="quantity" 
                              type="number" 
                              min="1" 
                              max="100" 
                              value={formData.quantity} 
                              onChange={handleInputChange} 
                              placeholder="1" 
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="color">Color</Label>
                            <Select 
                              value={formData.color} 
                              onValueChange={(value) => handleSelectChange(value, 'color')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select color" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="white">White</SelectItem>
                                <SelectItem value="black">Black</SelectItem>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                                <SelectItem value="multicolor">Multicolor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Card className="bg-muted/50">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-sm">
                                <Palette className="h-4 w-4" />
                                Color Options
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-3 gap-2">
                                {['white', 'black', 'red', 'blue', 'green', 'multicolor'].map(color => (
                                  <div 
                                    key={color} 
                                    className={`h-10 rounded border-2 flex items-center justify-center text-xs ${
                                      formData.color === color 
                                        ? 'border-primary ring-2 ring-primary/20' 
                                        : 'border-border'
                                    }`}
                                    style={{
                                      backgroundColor: 
                                        color === 'white' ? '#ffffff' :
                                        color === 'black' ? '#000000' :
                                        color === 'red' ? '#ef4444' :
                                        color === 'blue' ? '#3b82f6' :
                                        color === 'green' ? '#22c55e' : 
                                        '#fbbf24'
                                    }}
                                  >
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={calculateQuote}
                          disabled={!selectedFile}
                        >
                          Calculate Quote
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={!selectedFile || !formData.name || isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Job'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === 'quote' && (
                  <div className="space-y-6">
                    {quote ? (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold mb-2">Estimated Cost</h3>
                        <p className="text-4xl font-bold text-primary">R{quote.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Includes material, labor, and PAXI delivery
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6 text-left">
                          <div>
                            <p className="text-sm text-muted-foreground">Base Cost</p>
                            <p className="font-medium">R150.00</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Volume Surcharge</p>
                            <p className="font-medium">R{(quote * 0.3).toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Material (+{formData.material === 'premium' ? '50%' : formData.material === 'flexible' ? '75%' : '0'})</p>
                            <p className="font-medium">R{(quote * (formData.material === 'premium' ? 0.5 : formData.material === 'flexible' ? 0.75 : 0)).toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">PAXI Delivery</p>
                            <p className="font-medium">R59.95</p>
                          </div>
                        </div>
                        
                        <Button className="mt-6" onClick={() => setActiveTab('upload')}>
                          Submit This Job
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Calculate Your Quote</h3>
                        <p className="text-muted-foreground mb-4">
                          Upload your 3D model and configure your options to get an instant quote
                        </p>
                        <Button onClick={() => setActiveTab('upload')}>
                          Go to Upload
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'jobs' && (
                  <div className="space-y-4">
                    {printJobs.length > 0 ? (
                      printJobs.map(job => (
                        <Card key={job.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{job.name}</CardTitle>
                                <CardDescription>{job.description}</CardDescription>
                              </div>
                              {getStatusBadge(job.status)}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">ID</p>
                                <p className="font-mono text-sm">{job.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Created</p>
                                <p className="text-sm">{new Date(job.created_at).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Material</p>
                                <p className="text-sm capitalize">{job.material}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Cost</p>
                                <p className="font-medium">R{job.estimated_cost.toFixed(2)}</p>
                              </div>
                            </div>
                            
                            {job.tracking_number && (
                              <div className="mt-4 pt-4 border-t border-border">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                                    <p className="font-mono text-sm">{job.tracking_number}</p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Track
                                  </Button>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Print Jobs Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Submit your first 3D print job to get started
                        </p>
                        <Button onClick={() => setActiveTab('upload')}>
                          Create New Job
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>3D Printing Service</CardTitle>
                <CardDescription>
                  Professional 3D printing with nationwide delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">High-Quality Prints</h4>
                    <p className="text-sm text-muted-foreground">Precision printing with quality materials</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Free Delivery</h4>
                    <p className="text-sm text-muted-foreground">Free PAXI delivery on all 3D print orders</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Fast Turnaround</h4>
                    <p className="text-sm text-muted-foreground">Typically 3-5 business days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Multiple Materials</h4>
                    <p className="text-sm text-muted-foreground">PLA, ABS, and flexible TPU options</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supported File Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-mono text-sm">.STL</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Recommended</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-mono text-sm">.OBJ</span>
                    <span className="text-xs text-muted-foreground">Also accepted</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-mono text-sm">.FBX</span>
                    <span className="text-xs text-muted-foreground">Also accepted</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Base Cost</span>
                    <span className="font-medium">R150.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Per cm³ Volume</span>
                    <span className="font-medium">R50.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Premium Material (+50%)</span>
                    <span className="font-medium">R1.50/cm³</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Flexible Material (+75%)</span>
                    <span className="font-medium">R2.25/cm³</span>
                  </li>
                  <li className="flex justify-between border-t border-border pt-2 mt-2 font-medium">
                    <span>PAXI Delivery</span>
                    <span className="text-primary">FREE</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}