'use client'

import { useState, useEffect } from 'react'
import { bscClient } from '@/lib/bscClient'

export default function BscTest() {
  const [blockNumber, setBlockNumber] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlockNumber = async () => {
      try {
        setLoading(true)
        const block = await bscClient.getBlockNumber()
        setBlockNumber(block.toString())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBlockNumber()
  }, [])

  return (
    <div className="p-6 bg-card border border-border rounded-lg shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-foreground">BSC Connection Test</h2>
      
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Testing connection to BSC Mainnet...</span>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h3 className="text-lg font-medium text-destructive mb-2">Connection Error</h3>
          <p className="text-destructive">{error}</p>
          <div className="mt-3 text-sm text-muted-foreground">
            <p>Endpoint: https://bsc-mainnet.infura.io/v3/cb6685b37a9840a68ce734bd5828a566</p>
          </div>
        </div>
      )}
      
      {blockNumber && !loading && (
        <div className="p-4 bg-chart-2/10 border border-chart-2/20 rounded-lg">
          <h3 className="text-lg font-medium text-chart-2 mb-2">Connection Successful!</h3>
          <p className="text-foreground">
            Current BSC Block Number: <span className="font-mono font-bold">{blockNumber}</span>
          </p>
          <div className="mt-3 text-sm text-muted-foreground">
            <p>Endpoint: https://bsc-mainnet.infura.io/v3/cb6685b37a9840a68ce734bd5828a566</p>
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-medium text-foreground mb-2">About this test</h3>
        <p className="text-sm text-muted-foreground">
          This component tests the connection to BSC Mainnet using your Infura API key. 
          It makes a simple request to fetch the current block number to verify that 
          the connection is working properly.
        </p>
      </div>
    </div>
  )
}
