import { createPublicClient, http } from 'viem'
import { bsc } from 'viem/chains'

/**
 * BSC Mainnet Client
 * 
 * A dedicated client for interacting with the Binance Smart Chain Mainnet
 * using the provided Infura API key
 */

// Your Infura API key for BSC Mainnet
const INFURA_BSC_API_KEY = 'cb6685b37a9840a68ce734bd5828a566'

// BSC Mainnet RPC endpoint with API key
const BSC_RPC_URL = `https://bsc-mainnet.infura.io/v3/${INFURA_BSC_API_KEY}`

/**
 * Public Client for BSC Mainnet
 * 
 * This client is configured specifically for BSC Mainnet with:
 * - HTTP transport using Infura RPC endpoint
 * - Multicall batching for improved performance
 * - Proper chain configuration
 */
export const bscClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_RPC_URL),
  batch: {
    multicall: true,
  },
})

/**
 * Enhanced BSC Client with Custom Settings
 * 
 * This client includes additional optimizations for performance
 */
export const enhancedBscClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_RPC_URL),
  batch: {
    multicall: {
      batchSize: 1024,
      wait: 16,
    },
  },
  cacheTime: 4_000,
  pollingInterval: 8_000,
})

/**
 * Test function to verify the connection
 * 
 * @returns Promise<boolean> - True if connection is successful
 */
export const testBscConnection = async (): Promise<boolean> => {
  try {
    const blockNumber = await bscClient.getBlockNumber()
    console.log(`Connected to BSC Mainnet. Current block number: ${blockNumber}`)
    return true
  } catch (error) {
    console.error('Failed to connect to BSC Mainnet:', error)
    return false
  }
}

// Example usage:
// const blockNumber = await bscClient.getBlockNumber()
// const balance = await bscClient.getBalance({ 
//   address: '0x...' 
// })

// Test the connection (for development purposes)
if (typeof window === 'undefined') {
  // Server-side execution
  testBscConnection().then(success => {
    if (success) {
      console.log('BSC client initialized successfully')
    } else {
      console.warn('Failed to initialize BSC client')
    }
  })
}

export default bscClient