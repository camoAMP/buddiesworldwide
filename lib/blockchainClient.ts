import { createPublicClient, http, webSocket } from 'viem'
import { 
  mainnet, 
  sepolia, 
  optimism, 
  polygon, 
  arbitrum,
  bsc
} from 'viem/chains'

/**
 * Basic Public Client Configuration
 * 
 * A simple public client for reading blockchain data on Ethereum Mainnet
 */
export const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
  batch: {
    multicall: true,
  },
})

/**
 * BSC Mainnet Client Configuration
 * 
 * Public client for reading blockchain data on Binance Smart Chain Mainnet
 */
export const bscPublicClient = createPublicClient({
  chain: bsc,
  transport: http(`https://bsc-mainnet.infura.io/v3/cb6685b37a9840a68ce734bd5828a566`),
  batch: {
    multicall: true,
  },
})

/**
 * Custom RPC Client Configuration
 * 
 * Using a custom RPC endpoint for better reliability and rate limits
 */
export const customMainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL),
  batch: {
    multicall: {
      batchSize: 1024,
      wait: 16,
    },
  },
})

/**
 * Multi-chain Client Configuration
 * 
 * Clients for different networks
 */
export const sepoliaPublicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
  batch: {
    multicall: true,
  },
})

export const optimismPublicClient = createPublicClient({
  chain: optimism,
  transport: http(),
  batch: {
    multicall: true,
  },
})

export const polygonPublicClient = createPublicClient({
  chain: polygon,
  transport: http(),
  batch: {
    multicall: true,
  },
})

export const arbitrumPublicClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
  batch: {
    multicall: true,
  },
})

/**
 * WebSocket Client Configuration
 * 
 * For real-time updates and subscriptions
 */
export const wsMainnetClient = createPublicClient({
  chain: mainnet,
  transport: webSocket(
    process.env.NEXT_PUBLIC_MAINNET_WS_URL || 
    'wss://ethereum-rpc.publicnode.com'
  ),
})

/**
 * Advanced Client with Custom Settings
 * 
 * Optimized client with caching and custom polling intervals
 */
export const advancedPublicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
  batch: {
    multicall: {
      batchSize: 2048,
      wait: 32,
      deployless: false,
    },
  },
  cacheTime: 4_000,
  pollingInterval: 8_000,
})

// Export all clients in an object for easy access
export const clients = {
  mainnet: mainnetPublicClient,
  bsc: bscPublicClient,
  sepolia: sepoliaPublicClient,
  optimism: optimismPublicClient,
  polygon: polygonPublicClient,
  arbitrum: arbitrumPublicClient,
  custom: customMainnetClient,
  websocket: wsMainnetClient,
  advanced: advancedPublicClient,
}

// Example usage:
// const blockNumber = await clients.bsc.getBlockNumber()
// const balance = await clients.bsc.getBalance({ 
//   address: '0x...' 
// })