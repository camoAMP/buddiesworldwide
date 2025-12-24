'use client'

import BlockchainInfo from '@/components/blockchain-info'
import Link from 'next/link'

export default function ViemDemoPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <Link href="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
          <h1 className="text-3xl font-bold mt-4">Viem Public Client Demo</h1>
          <p className="text-gray-600 mt-2">
            This page demonstrates the viem public client integration for reading blockchain data.
          </p>
        </header>

        <main className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What is Viem?</h2>
            <p className="mb-4">
              Viem is a modern, high-performance TypeScript library for interacting with Ethereum and other EVM-compatible blockchains. 
              It provides a powerful yet simple API for reading blockchain data, sending transactions, and interacting with smart contracts.
            </p>
            <p>
              In this demo, we're using a Public Client to read data from the Ethereum blockchain without requiring a wallet connection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Live Blockchain Data</h2>
            <BlockchainInfo />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Implementation Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Key Implementation Files:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><code>lib/viemClient.ts</code> - Basic viem public client configuration</li>
                <li><code>lib/blockchainClient.ts</code> - Extended client configurations for multiple chains</li>
                <li><code>hooks/useBlockchainData.ts</code> - React hooks for fetching blockchain data</li>
                <li><code>components/blockchain-info.tsx</code> - UI component displaying blockchain data</li>
              </ul>
            </div>
            
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Features Demonstrated:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Public client setup with HTTP transport</li>
                <li>Multicall batching for improved performance</li>
                <li>React hooks for data fetching and state management</li>
                <li>Real-time data updates with polling</li>
                <li>Error handling and loading states</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
            <p>
              To extend this implementation, you could:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Add wallet client functionality for transaction signing</li>
              <li>Integrate with smart contracts using the viem contract API</li>
              <li>Implement WebSocket subscriptions for real-time events</li>
              <li>Add support for multiple EVM chains</li>
              <li>Connect with wallet providers like MetaMask or WalletConnect</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}