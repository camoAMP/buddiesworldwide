'use client'

import { useState } from 'react'

export default function BscApiTest() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const testApiConnection = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/test-bsc')
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'An unknown error occurred')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch from API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-card border border-border rounded-lg shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-foreground">BSC API Connection Test</h2>
      
      <div className="mb-6">
        <button
          onClick={testApiConnection}
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:bg-primary/50 transition-colors"
        >
          {loading ? 'Testing Connection...' : 'Test API Connection'}
        </button>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Testing connection to BSC Mainnet via API...</span>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h3 className="text-lg font-medium text-destructive mb-2">API Error</h3>
          <p className="text-destructive">{error}</p>
        </div>
      )}
      
      {result && !loading && (
        <div className="p-4 bg-chart-2/10 border border-chart-2/20 rounded-lg">
          <h3 className="text-lg font-medium text-chart-2 mb-2">API Connection Successful!</h3>
          
          <div className="space-y-2 text-foreground">
            <p><span className="font-medium">Status:</span> Success</p>
            <p><span className="font-medium">Network:</span> {result.data.network}</p>
            <p><span className="font-medium">Provider:</span> {result.data.provider}</p>
            <p><span className="font-medium">Block Number:</span> <span className="font-mono">{result.data.blockNumber}</span></p>
            <p><span className="font-medium">Gas Price:</span> <span className="font-mono">{result.data.gasPrice}</span> wei</p>
            <p><span className="font-medium">Timestamp:</span> {result.data.timestamp}</p>
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-medium text-foreground mb-2">About this test</h3>
        <p className="text-sm text-muted-foreground">
          This component tests the connection to BSC Mainnet through a Next.js API route. 
          The API route uses the configured BSC client to fetch blockchain data and returns it as JSON.
        </p>
      </div>
    </div>
  )
}
