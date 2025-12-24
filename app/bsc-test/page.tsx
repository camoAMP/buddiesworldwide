'use client'

import BscTest from '@/components/bsc-test'
import Link from 'next/link'

export default function BscTestPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-block mb-6 text-muted-foreground hover:text-primary hover:underline">
          &larr; Back to Home
        </Link>
        
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            BSC Mainnet Connection Test
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testing connection to Binance Smart Chain Mainnet using the provided Infura API key.
          </p>
        </header>

        <main>
          <BscTest />
          
          <div className="mt-12 bg-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-foreground">Connection Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">API Key Information</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="font-medium">Key:</span> cb6685b37a9840a68ce734bd5828a566</li>
                  <li><span className="font-medium">Network:</span> BSC Mainnet</li>
                  <li><span className="font-medium">Provider:</span> Infura</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Technical Implementation</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="font-medium">Endpoint:</span> https://bsc-mainnet.infura.io/v3/...</li>
                  <li><span className="font-medium">Method:</span> eth_blockNumber</li>
                  <li><span className="font-medium">Library:</span> Viem</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-muted-foreground text-sm">
          <p>
            This test verifies that your Infura API key is properly configured and able to connect to BSC Mainnet.
          </p>
        </footer>
      </div>
    </div>
  )
}
