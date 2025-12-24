import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">Find answers to common questions about Buddies World Wide</p>
          </div>

          <div className="space-y-8">
            {/* General Questions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">General Questions</h2>
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is Buddies World Wide?</AccordionTrigger>
                      <AccordionContent>
                        Buddies World Wide is a multi-vendor marketplace that connects customers with vendors from
                        around the world. We offer a wide range of products including 420 products, household
                        essentials, fresh produce, and snacks.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it free to shop on Buddies World Wide?</AccordionTrigger>
                      <AccordionContent>
                        Yes! Creating a customer account and shopping on our platform is completely free. You only pay
                        for the products you purchase and applicable shipping fees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do I become a vendor?</AccordionTrigger>
                      <AccordionContent>
                        Visit our vendor registration page and sign up for a subscription plan starting at R549/month.
                        Once approved, you can start listing your products and reaching customers worldwide.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Orders & Shipping */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Orders & Shipping</h2>
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-4">
                      <AccordionTrigger>What are the shipping costs?</AccordionTrigger>
                      <AccordionContent>
                        Shipping costs vary based on your location and the shipping method you choose:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Standard Delivery: R99</li>
                          <li>Express Delivery: R249</li>
                          <li>Same-Day Delivery: R499 (select areas only)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>How long does delivery take?</AccordionTrigger>
                      <AccordionContent>
                        Standard delivery typically takes 3-5 business days, express delivery 1-2 business days, and
                        same-day delivery is available for orders placed before 12 PM in select areas.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>Can I track my order?</AccordionTrigger>
                      <AccordionContent>
                        Yes! Once your order is shipped, you'll receive a tracking number via email and SMS. You can
                        also track your order status in real-time from your account dashboard.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Payments */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Payments</h2>
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-7">
                      <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                      <AccordionContent>
                        We accept a wide variety of payment methods including:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Credit/Debit Cards (Visa, Mastercard, American Express)</li>
                          <li>PayPal</li>
                          <li>Cryptocurrency (Bitcoin, Ethereum, USDT)</li>
                          <li>EFT/Bank Transfer</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8">
                      <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
                      <AccordionContent>
                        We use industry-standard encryption and security measures to protect your payment information.
                        We never store your full credit card details on our servers.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-9">
                      <AccordionTrigger>Do you charge VAT?</AccordionTrigger>
                      <AccordionContent>
                        Yes, a 15% VAT is applied to all orders as required by South African law. The VAT amount is
                        clearly displayed at checkout before you complete your purchase.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Returns & Refunds */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Returns & Refunds</h2>
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-10">
                      <AccordionTrigger>What is your return policy?</AccordionTrigger>
                      <AccordionContent>
                        We offer a 30-day return policy for most items. Products must be in their original condition and
                        packaging. Contact customer support to initiate a return.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-11">
                      <AccordionTrigger>How long do refunds take?</AccordionTrigger>
                      <AccordionContent>
                        Once we receive your returned item, refunds are typically processed within 5-7 business days.
                        The funds will be returned to your original payment method.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-12">
                      <AccordionTrigger>Can I exchange an item?</AccordionTrigger>
                      <AccordionContent>
                        Yes! If you'd like to exchange an item for a different size or color, please contact our
                        customer support team and we'll arrange the exchange for you.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
