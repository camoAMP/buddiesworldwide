'use client'

import { useBlockchainData, useAccountBalance } from '@/hooks/useBlockchainData'

export default function BlockchainInfo() {
  const { blockNumber, gasPrice, isLoading, error } = useBlockchainData()
  const { formattedBalance, isLoading: balanceLoading } = useAccountBalance(
    '0x00000000219ab540356cBB839Cbe05303d7705Fa' // Example address (Wintermute)
  )

  if (isLoading) {
    return (
      <div className="p-4 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-bold mb-2 text-foreground">Blockchain Info</h2>
        <p className="text-muted-foreground">Loading blockchain data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <h2 className="text-xl font-bold mb-2 text-foreground">Blockchain Info</h2>
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <h2 className="text-xl font-bold mb-2 text-foreground">Blockchain Info</h2>
      
      <div className="space-y-2">
        <div>
          <span className="font-medium">Latest Block:</span> 
          <span className="ml-2">{blockNumber?.toString()}</span>
        </div>
        
        <div>
          <span className="font-medium">Current Gas Price:</span> 
          <span className="ml-2">
            {gasPrice ? `${(Number(gasPrice) / 1e9).toFixed(2)} Gwei` : 'N/A'}
          </span>
        </div>
        
        <div>
          <span className="font-medium">Example Balance:</span>
          <span className="ml-2">
            {balanceLoading ? (
              'Loading...'
            ) : (
              <>
                {formattedBalance ? `${formattedBalance} ETH` : 'N/A'}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
