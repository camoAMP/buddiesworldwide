'use client'

import { useSmartAccount } from '@/hooks/useSmartAccount'
import { useState } from 'react'

export default function SmartAccountDemo() {
  const {
    smartAccount,
    ownerAccount,
    isCreating,
    isSending,
    userOpHash,
    receipt,
    error,
    createAccount,
    sendTransaction,
    waitForReceipt
  } = useSmartAccount()

  const [recipient, setRecipient] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')
  const [amount, setAmount] = useState('0.001')

  const handleCreateAccount = async () => {
    // In a real app, you would get the private key from a wallet connection
    // For demo purposes, we're using a test private key
    await createAccount()
  }

  const handleSendTransaction = async () => {
    await sendTransaction(recipient as `0x${string}`, amount)
  }

  const handleWaitForReceipt = async () => {
    await waitForReceipt()
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card border border-border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-foreground">MetaMask Smart Accounts Demo</h2>
      
      <div className="space-y-6">
        {/* Account Creation Section */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Smart Account Creation</h3>
          {!smartAccount ? (
            <button
              onClick={handleCreateAccount}
              disabled={isCreating}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:bg-primary/50"
            >
              {isCreating ? 'Creating Account...' : 'Create Smart Account'}
            </button>
          ) : (
            <div className="text-chart-2 font-medium">
              ✓ Smart Account Created
            </div>
          )}
          
          {ownerAccount && (
            <div className="mt-3 text-sm text-muted-foreground">
              <p>Owner Address: {ownerAccount.address}</p>
              <p>Smart Account Address: {smartAccount?.address}</p>
            </div>
          )}
        </div>

        {/* Transaction Section */}
        {smartAccount && (
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Send Transaction</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="0x..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Amount (ETH)
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="0.001"
                />
              </div>
              
              <button
                onClick={handleSendTransaction}
                disabled={isSending}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:bg-primary/50"
              >
                {isSending ? 'Sending...' : 'Send Transaction'}
              </button>
            </div>
            
            {userOpHash && (
              <div className="mt-4 p-3 bg-primary/10 rounded">
                <p className="text-sm text-foreground">
                  User Operation Hash: {userOpHash}
                </p>
                <button
                  onClick={handleWaitForReceipt}
                  className="mt-2 px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded hover:bg-secondary/80"
                >
                  Get Receipt
                </button>
              </div>
            )}
            
            {receipt && (
              <div className="mt-4 p-3 bg-chart-2/10 rounded">
                <p className="text-sm text-chart-2">
                  Transaction Successful!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Status: {receipt.receipt.status === 'success' ? 'Success' : 'Failed'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Transaction Hash: {receipt.receipt.transactionHash}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="border border-destructive/20 bg-destructive/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-destructive mb-2">Error</h3>
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* Information Section */}
        <div className="border border-border rounded-lg p-4 bg-muted/50">
          <h3 className="text-lg font-semibold mb-3">About Smart Accounts</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Smart Accounts are programmable accounts that enable enhanced functionality beyond traditional wallets</li>
            <li>This demo uses MetaMask's Smart Accounts Kit with a Hybrid implementation</li>
            <li>User operations are bundled and submitted through a bundler service</li>
            <li>The account is automatically deployed on the first transaction</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
