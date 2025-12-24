import { createPublicClient, http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

// Create a public client for reading blockchain data
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    process.env.RPC_URL || 
    process.env.NEXT_PUBLIC_RPC_URL ||
    undefined // Will use default public RPC if none provided
  ),
  batch: {
    multicall: true, // Enable multicall batching for better performance
  },
})

// Create a Sepolia testnet client for smart accounts
export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(
    process.env.SEPOLIA_RPC_URL ||
    undefined
  ),
  batch: {
    multicall: true,
  },
})

// Export all clients in an object for easy access
export const clients = {
  mainnet: publicClient,
  sepolia: sepoliaClient,
}

// Example usage:
// const blockNumber = await publicClient.getBlockNumber()
// const balance = await publicClient.getBalance({ 
//   address: '0x...' 
// })