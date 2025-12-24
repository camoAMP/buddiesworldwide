import { useEffect, useState } from 'react'
import { publicClient } from '@/lib/viemClient'
import { formatUnits } from 'viem'

interface BlockchainData {
  blockNumber?: bigint
  gasPrice?: bigint
  etherPrice?: string
  isLoading: boolean
  error?: string
}

/**
 * A React hook to fetch basic blockchain data using viem public client
 * 
 * @returns BlockchainData - Current blockchain data and status
 */
export const useBlockchainData = (): BlockchainData => {
  const [data, setData] = useState<BlockchainData>({
    isLoading: true
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData({ isLoading: true })
        
        // Fetch multiple data points in parallel
        const [blockNumber, gasPrice] = await Promise.all([
          publicClient.getBlockNumber(),
          publicClient.getGasPrice(),
        ])

        setData({
          blockNumber,
          gasPrice,
          isLoading: false
        })
      } catch (error) {
        setData({
          isLoading: false,
          error: error instanceof Error ? error.message : 'An unknown error occurred'
        })
      }
    }

    fetchData()
    
    // Set up polling for updates
    const interval = setInterval(fetchData, 15000) // Update every 15 seconds
    
    return () => clearInterval(interval)
  }, [])

  return data
}

interface AccountBalance {
  balance?: string
  formattedBalance?: string
  isLoading: boolean
  error?: string
}

/**
 * A React hook to fetch account balance
 * 
 * @param address - Ethereum address to check balance for
 * @returns AccountBalance - Balance information and status
 */
export const useAccountBalance = (address?: string): AccountBalance => {
  const [balance, setBalance] = useState<AccountBalance>({
    isLoading: false
  })

  useEffect(() => {
    if (!address) {
      setBalance({ isLoading: false })
      return
    }

    const fetchBalance = async () => {
      try {
        setBalance({ isLoading: true })
        
        const balance = await publicClient.getBalance({ 
          address: address as `0x${string}` 
        })
        
        setBalance({
          balance: balance.toString(),
          formattedBalance: formatUnits(balance, 18), // Convert Wei to Ether
          isLoading: false
        })
      } catch (error) {
        setBalance({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch balance'
        })
      }
    }

    fetchBalance()
  }, [address])

  return balance
}