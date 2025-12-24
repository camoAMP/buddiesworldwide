import { useEffect, useState } from 'react'
import { bscClient } from '@/lib/bscClient'
import { formatUnits } from 'viem'

interface BscData {
  blockNumber?: bigint
  gasPrice?: bigint
  isLoading: boolean
  error?: string
}

/**
 * A React hook to fetch BSC Mainnet data using viem public client
 * 
 * @returns BscData - Current BSC blockchain data and status
 */
export const useBscData = (): BscData => {
  const [data, setData] = useState<BscData>({
    isLoading: true
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData({ isLoading: true })
        
        // Fetch multiple data points in parallel
        const [blockNumber, gasPrice] = await Promise.all([
          bscClient.getBlockNumber(),
          bscClient.getGasPrice(),
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

interface BscAccountBalance {
  balance?: string
  formattedBalance?: string
  isLoading: boolean
  error?: string
}

/**
 * A React hook to fetch BSC account balance
 * 
 * @param address - BSC address to check balance for
 * @returns BscAccountBalance - Balance information and status
 */
export const useBscAccountBalance = (address?: string): BscAccountBalance => {
  const [balance, setBalance] = useState<BscAccountBalance>({
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
        
        const balance = await bscClient.getBalance({ 
          address: address as `0x${string}` 
        })
        
        setBalance({
          balance: balance.toString(),
          formattedBalance: formatUnits(balance, 18), // Convert Wei to BNB
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

interface BscTokenBalance {
  tokenBalance?: string
  formattedTokenBalance?: string
  isLoading: boolean
  error?: string
}

/**
 * A React hook to fetch BSC token balance
 * 
 * @param tokenAddress - Token contract address
 * @param userAddress - User address to check balance for
 * @returns BscTokenBalance - Token balance information and status
 */
export const useBscTokenBalance = (
  tokenAddress?: string, 
  userAddress?: string
): BscTokenBalance => {
  const [tokenBalance, setTokenBalance] = useState<BscTokenBalance>({
    isLoading: false
  })

  useEffect(() => {
    if (!tokenAddress || !userAddress) {
      setTokenBalance({ isLoading: false })
      return
    }

    const fetchTokenBalance = async () => {
      try {
        setTokenBalance({ isLoading: true })
        
        // ERC-20 token balance function signature
        const balance = await bscClient.readContract({
          address: tokenAddress as `0x${string}`,
          abi: [
            {
              constant: true,
              inputs: [{ name: "_owner", type: "address" }],
              name: "balanceOf",
              outputs: [{ name: "balance", type: "uint256" }],
              type: "function",
            },
          ],
          functionName: 'balanceOf',
          args: [userAddress as `0x${string}`],
        })
        
        setTokenBalance({
          tokenBalance: balance.toString(),
          // Note: You would need to know the token decimals to format properly
          formattedTokenBalance: formatUnits(balance as bigint, 18),
          isLoading: false
        })
      } catch (error) {
        setTokenBalance({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch token balance'
        })
      }
    }

    fetchTokenBalance()
  }, [tokenAddress, userAddress])

  return tokenBalance
}