'use client'

import BscInfo from '@/components/bsc-info'
import Link from 'next/link'

export default function BscDemoPage() {
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <Link href="/" className="text-muted-foreground hover:text-primary hover:underline">&larr; Back to Home</Link>
          <h1 className="text-3xl font-bold mt-4 text-foreground">BSC Mainnet Integration Demo</h1>
          <p className="text-muted-foreground mt-2">
            This page demonstrates the integration with Binance Smart Chain Mainnet using the provided Infura API key.
          </p>
        </header>

        <main className="space-y-6">
          <section className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">About BSC Integration</h2>
            <p className="mb-4">
              This demo showcases integration with Binance Smart Chain (BSC) Mainnet using your Infura API key. 
              We've configured a dedicated client to interact with the BSC network, allowing us to fetch blockchain data 
              such as block numbers, gas prices, and account balances.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <h3 className="font-medium text-foreground mb-2">API Key Information:</h3>
              <p className="text-sm">
                <span className="font-mono bg-muted px-1 py-0.5 rounded">cb6685b37a9840a68ce734bd5828a566</span>
              </p>
              <p className="text-sm mt-1">
                Connected to: <span className="font-mono">https://bsc-mainnet.infura.io/v3/cb6685b37a9840a68ce734bd5828a566</span>
              </p>
            </div>
          </section>

          <section className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Live BSC Data</h2>
            <BscInfo />
          </section>

          <section className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Implementation Details</h2>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Key Implementation Files:</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li><code>lib/bscClient.ts</code> - Dedicated BSC client with Infura API key</li>
                <li><code>lib/blockchainClient.ts</code> - Updated with BSC client in multi-chain setup</li>
                <li><code>hooks/useBscData.ts</code> - React hooks for fetching BSC data</li>
                <li><code>components/bsc-info.tsx</code> - UI component displaying BSC data</li>
              </ul>
            </div>
            
            <div className="mt-4 bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Features Demonstrated:</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>BSC Mainnet client setup with HTTP transport</li>
                <li>Multicall batching for improved performance</li>
                <li>React hooks for data fetching and state management</li>
                <li>Real-time data updates with polling</li>
                <li>Error handling and loading states</li>
              </ul>
            </div>
          </section>
          
          <section className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Next Steps</h2>
            <p>
              To extend this implementation, you could:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-muted-foreground">
              <li>Add wallet client functionality for transaction signing on BSC</li>
              <li>Integrate with BSC-based smart contracts</li>
              <li>Implement token balance checking for BEP-20 tokens</li>
              <li>Add support for BSC Testnet</li>
              <li>Create cross-chain functionality between Ethereum and BSC</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}
