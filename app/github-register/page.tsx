'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Globe, Mail, Lock, User, ArrowRight, ShieldCheck, Truck, Github, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function GithubRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Cape Town');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real implementation, this would:
    // 1. Verify the GitHub OAuth token
    // 2. Create/update the user in the database
    // 3. Handle the phone verification
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    toast.success("Account created successfully! Please verify your phone number.");
  };

  const handleGithubLogin = () => {
    // In a real implementation, this would redirect to GitHub OAuth
    console.log('Redirecting to GitHub OAuth...');
    // window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/github`;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-12 flex-col justify-center">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <Globe className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground">Buddies</span>
            <span className="text-2xl font-light text-primary"> World Wide</span>
          </div>
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-6">Join Our South African Marketplace</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Connect with trusted vendors in your community. Buy and sell locally with our secure platform.
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Local Delivery</h3>
              <p className="text-sm text-muted-foreground">PAXI/PEP store delivery across South Africa</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Secure Transactions</h3>
              <p className="text-sm text-muted-foreground">Escrow payments with 8% + R10 fee</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Community Focused</h3>
              <p className="text-sm text-muted-foreground">Peer-to-peer classifieds for South Africa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">Register with GitHub</CardTitle>
            <CardDescription>Verify your GitHub access to join our developer community marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full bg-transparent flex items-center justify-center gap-2"
                onClick={handleGithubLogin}
              >
                <Github className="h-4 w-4" />
                Continue with GitHub
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or enter details manually</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github-repo">GitHub Repository</Label>
                  <div className="relative">
                    <Input 
                      id="github-repo" 
                      placeholder="camoAMP/buddiesworldwide" 
                      required 
                      readOnly
                      value="camoAMP/buddiesworldwide"
                      className="bg-muted"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You must be a contributor to camoAMP/buddiesworldwide to register
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (SA)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      placeholder="+27 82 123 4567" 
                      className="pl-10" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      pattern="^\+27\s\d{2}\s\d{3}\s\d{4}$|^$"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Cape Town" 
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    "Verifying..."
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link href="/register" className="text-sm text-secondary hover:underline">
                Register with email instead
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}