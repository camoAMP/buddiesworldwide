'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, Star, Gem, Building2, Wallet, CreditCard, Sparkles } from 'lucide-react';

const promotionPlans = [
  {
    id: 'verified-business',
    name: 'Verified Business',
    price: 99,
    period: 'month',
    description: 'Boost your credibility',
    features: [
      'Verified Business badge on profile',
      'Access to customer reviews',
      'Priority customer support',
      'Basic analytics dashboard',
      'Up to 50 product listings'
    ],
    icon: <Building2 className="h-6 w-6" />,
    popular: false
  },
  {
    id: 'top-category',
    name: 'Top of Category',
    price: 299,
    period: 'month',
    description: 'Rank at the top of your category',
    features: [
      'Featured at top of category',
      'Highlighted listings with crown icon',
      'Advanced analytics',
      'Priority customer support',
      'Up to 200 product listings',
      'Early access to new features'
    ],
    icon: <Crown className="h-6 w-6" />,
    popular: true
  },
  {
    id: 'homepage-banner',
    name: 'Homepage Banner',
    price: 599,
    period: 'month',
    description: 'Promote your business on the homepage',
    features: [
      'Rotating banner on homepage',
      'Featured in homepage carousel',
      'Dedicated customer support',
      'Full analytics suite',
      'Unlimited product listings',
      'Marketing consultation session',
      'Custom promotional tools'
    ],
    icon: <Gem className="h-6 w-6" />,
    popular: false
  }
];

export default function BusinessPromotionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'eft'>('card');

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // In a real implementation, this would redirect to payment processing
    console.log(`Selected plan: ${planId} with payment method: ${paymentMethod}`);
    alert(`Subscription to ${promotionPlans.find(p => p.id === planId)?.name} would be processed in a real implementation`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Business Promotions
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Grow Your Business</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take your store to the next level with our premium promotion packages designed to increase visibility and sales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {promotionPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary border-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-full ${
                    plan.popular ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-2">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">R{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start justify-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="justify-center pb-6">
                <Button 
                  className="w-full" 
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Processing...' : 'Subscribe Now'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Payment Options
              </CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Button 
                  variant={paymentMethod === 'card' ? 'default' : 'outline'} 
                  onClick={() => setPaymentMethod('card')}
                  className="flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Card
                </Button>
                <Button 
                  variant={paymentMethod === 'crypto' ? 'default' : 'outline'} 
                  onClick={() => setPaymentMethod('crypto')}
                  className="flex items-center justify-center gap-2"
                >
                  <Gem className="h-4 w-4" />
                  Crypto
                </Button>
                <Button 
                  variant={paymentMethod === 'eft' ? 'default' : 'outline'} 
                  onClick={() => setPaymentMethod('eft')}
                  className="flex items-center justify-center gap-2"
                >
                  <Star className="h-4 w-4" />
                  EFT
                </Button>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Subscription Benefits
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Automatic renewal until cancelled</li>
                  <li>• Pause or downgrade anytime</li>
                  <li>• No setup fees</li>
                  <li>• Full money-back guarantee in first 7 days</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gem className="h-5 w-5 text-primary" />
                  Success Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "After upgrading to Top of Category, our sales increased by 150% in just two weeks. The visibility boost was incredible!"
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="font-medium">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">TechGadgets SA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Why Upgrade?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Stand out from competitors
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Increase product visibility
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Build customer trust
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Access advanced analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Frequently Asked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">How long does it take to activate?</p>
                    <p className="text-sm text-muted-foreground">Your promotion activates within 1 hour of payment confirmation.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Can I pause my subscription?</p>
                    <p className="text-sm text-muted-foreground">Yes, you can pause and resume anytime from your account settings.</p>
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