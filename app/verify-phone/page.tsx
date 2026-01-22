'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Phone, Smartphone, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function VerifyPhonePage() {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const sendVerificationCode = async () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsSending(true);
    
    // In a real implementation, this would call the backend to send an SMS
    // For now, we'll simulate the process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSending(false);
    setSent(true);
    
    toast.success("Verification code sent to your phone!");
  };

  const verifyCode = async () => {
    if (!verificationCode) {
      toast.error("Please enter the verification code");
      return;
    }

    setIsVerifying(true);
    
    // In a real implementation, this would verify the code with the backend
    // For now, we'll simulate success if the code is "123456"
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (verificationCode === "123456") {
      setIsVerifying(false);
      setVerified(true);
      toast.success("Phone number verified successfully!");
    } else {
      setIsVerifying(false);
      toast.error("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground">Buddies</span>
            <span className="text-2xl font-light text-primary"> World Wide</span>
          </div>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Verify Your Phone
            </CardTitle>
            <CardDescription>
              {verified 
                ? "Your phone number has been verified!" 
                : sent 
                  ? "Enter the verification code sent to your phone" 
                  : "Enter your South African phone number to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!verified ? (
              <div className="space-y-4">
                {!sent ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+27 82 123 4567"
                          className="pl-10"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          pattern="^\+27\s\d{2}\s\d{3}\s\d{4}$|^$"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter your South African phone number in the format +27 XX XXX XXXX
                      </p>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={sendVerificationCode}
                      disabled={isSending || !phone}
                    >
                      {isSending ? (
                        <>
                          <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Verification Code
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="verification-code">Verification Code</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="verification-code"
                          type="text"
                          placeholder="Enter 6-digit code"
                          className="pl-10"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          maxLength={6}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1" 
                        onClick={verifyCode}
                        disabled={isVerifying || !verificationCode}
                      >
                        {isVerifying ? (
                          <>
                            <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify Code"
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={sendVerificationCode}
                        disabled={isSending}
                      >
                        Resend
                      </Button>
                    </div>
                    
                    <Alert variant="info" className="text-xs">
                      <AlertDescription>
                        For demo purposes, use code: <strong>123456</strong>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
                
                {!sent && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Phone Verified!</h3>
                <p className="text-muted-foreground mb-6">
                  Your phone number has been successfully verified. You can now use all features of Buddies Worldwide.
                </p>
                
                <Link href="/dashboard">
                  <Button className="w-full">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
            
            {!verified && (
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>By verifying your phone, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}