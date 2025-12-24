'use client'

import BscApiTest from '@/components/bsc-api-test'
import Link from 'next/link'

export default function BscApiTestPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="inline-block mb-6 text-muted-foreground hover:text-primary hover:underline">
          &larr; Back to Home
        </Link>
        
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            BSC Mainnet API Connection Test
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testing connection to Binance Smart Chain Mainnet through a Next.js API route.
          </p>
        </header>

        <main>
          <BscApiTest />
          
          <div className="mt-12 bg-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-foreground">Implementation Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">API Route</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Endpoint: <code className="bg-muted/50 px-1 rounded">/api/test-bsc</code></li>
                  <li>Method: GET</li>
                  <li>Returns: JSON response with BSC data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Server-Side Benefits</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Keeps API keys secure on server</li>
                  <li>Better error handling</li>
                  <li>Caching opportunities</li>
                  <li>Easier testing and debugging</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-muted-foreground text-sm">
          <p>
            This test verifies that your Infura API key works correctly when accessed through a Next.js API route.
          </p>
        </footer>
      </div>
    </div>
  )
}
