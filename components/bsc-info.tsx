'use client'

import { useBscData, useBscAccountBalance } from '@/hooks/useBscData'

export default function BscInfo() {
  const { blockNumber, gasPrice, isLoading, error } = useBscData()
  const { formattedBalance, isLoading: balanceLoading } = useBscAccountBalance(
    '0x0000000000000000000000000000000000001004' // Example BSC address (can be replaced)
  )

  if (isLoading) {
    return (
      <div className="p-4 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-bold mb-2 text-foreground">BSC Mainnet Info</h2>
        <p className="text-muted-foreground">Loading BSC data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <h2 className="text-xl font-bold mb-2 text-foreground">BSC Mainnet Info</h2>
        <p className="text-destructive">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <h2 className="text-xl font-bold mb-2 text-foreground">BSC Mainnet Info</h2>
      
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
                {formattedBalance ? `${formattedBalance} BNB` : 'N/A'}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
