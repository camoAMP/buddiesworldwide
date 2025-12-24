'use client'

import SmartAccountDemo from '@/components/smart-account-demo'
import Link from 'next/link'

export default function SmartAccountsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-block mb-6 text-muted-foreground hover:text-primary hover:underline">
          &larr; Back to Home
        </Link>
        
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            MetaMask Smart Accounts Kit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This demo showcases the implementation of MetaMask Smart Accounts using the Smart Accounts Kit.
            Create a smart account and send transactions using account abstraction.
          </p>
        </header>

        <main>
          <SmartAccountDemo />
          
          <div className="mt-12 bg-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-foreground">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Smart Account Benefits</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                  <li>Batch multiple transactions in a single operation</li>
                  <li>Enable social recovery mechanisms</li>
                  <li>Implement spending limits and security policies</li>
                  <li>Support multiple signing methods including passkeys</li>
                  <li>Pay gas fees with ERC-20 tokens</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Technical Implementation</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                  <li>Built on ERC-4337 standard for account abstraction</li>
                  <li>Uses Viem for blockchain interactions</li>
                  <li>Integrates with bundler services for transaction submission</li>
                  <li>Supports Hybrid implementation with EOA and passkey signers</li>
                  <li>Automatically deploys account contracts on first use</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-muted-foreground text-sm">
          <p>
            This is a demonstration of MetaMask Smart Accounts Kit integration.
            For production use, connect with actual wallet providers and secure key management.
          </p>
        </footer>
      </div>
    </div>
  )
}
