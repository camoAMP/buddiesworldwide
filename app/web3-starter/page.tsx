'use client'

import Link from 'next/link'
import BscInfo from '@/components/bsc-info'
import BscTest from '@/components/bsc-test'
import BscApiTest from '@/components/bsc-api-test'
import BlockchainInfo from '@/components/blockchain-info'
import SmartAccountDemo from '@/components/smart-account-demo'

export default function Web3StarterPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link href="/" className="inline-block mb-6 text-muted-foreground hover:text-primary hover:underline">
          &larr; Back to Home
        </Link>
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Web3 Application Starter Kit
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to start building a winning Web3 application with blockchain integration
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blockchain Data Section */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Ethereum Blockchain Data</h2>
            <BlockchainInfo />
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Real-time data from Ethereum Mainnet</p>
            </div>
          </div>

          {/* BSC Data Section */}
          <div className="bg-card border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground">BSC Blockchain Data</h2>
            <BscInfo />
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Real-time data from Binance Smart Chain using your Infura API key</p>
            </div>
          </div>

          {/* Smart Accounts Section */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground">MetaMask Smart Accounts</h2>
            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <p className="text-muted-foreground">
                Smart Accounts are programmable accounts that enable enhanced functionality beyond traditional wallets.
                This demo uses MetaMask's Smart Accounts Kit with a Hybrid implementation.
              </p>
            </div>
            <SmartAccountDemo />
          </div>

          {/* Connection Tests Section */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Client-Side Connection Test</h2>
              <BscTest />
            </div>
            
            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Server-Side API Test</h2>
              <BscApiTest />
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-12 bg-card border border-border rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Web3 Development Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2 text-foreground">Send Requests</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Test sending a variety of requests directly from documentation
              </p>
              <Link href="/bsc-api-test" className="text-primary hover:underline text-sm font-medium">
                Try it &rarr;
              </Link>
            </div>
            
            <div className="border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2 text-foreground">Integrate MetaMask</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Use MetaMask SDK to connect user wallets to your app
              </p>
              <Link href="/smart-accounts-demo" className="text-primary hover:underline text-sm font-medium">
                Learn how &rarr;
              </Link>
            </div>
            
            <div className="border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2 text-foreground">Developer Center</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Interactive lessons to begin your Web3 journey
              </p>
              <a 
                href="https://docs.metamask.io/wallet/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium"
              >
                Start learning &rarr;
              </a>
            </div>
            
            <div className="border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2 text-foreground">Community Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get personalized support from the MetaMask community
              </p>
              <a 
                href="https://discord.gg/metamask" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium"
              >
                Join Discord &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mt-12 bg-card border border-border rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Technology Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-chart-1 pl-4">
              <h3 className="font-bold text-lg mb-2">Frontend</h3>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-chart-2 pl-4">
              <h3 className="font-bold text-lg mb-2">Blockchain</h3>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Viem (Ethereum library)</li>
                <li>• MetaMask Smart Accounts Kit</li>
                <li>• Infura (RPC provider)</li>
                <li>• BSC & Ethereum Mainnet</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-chart-3 pl-4">
              <h3 className="font-bold text-lg mb-2">Backend</h3>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Next.js API Routes</li>
                <li>• Server Actions</li>
                <li>• Supabase (Database/Auth)</li>
                <li>• Prisma ORM</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-muted-foreground text-sm">
          <p>
            This Web3 starter kit provides everything you need to build decentralized applications.
            Start exploring the components above to see how each piece fits together.
          </p>
        </footer>
      </div>
    </div>
  )
}
