# Viem Public Client Setup

This document explains how to set up and use the viem public client in this project.

## Installation

We've already installed viem in the project:

```bash
npm install viem --legacy-peer-deps
```

## Files Created

1. [`lib/viemClient.ts`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/lib/viemClient.ts) - Basic public client configuration
2. [`lib/blockchainClient.ts`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/lib/blockchainClient.ts) - Extended multi-chain client configurations
3. [`lib/bscClient.ts`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/lib/bscClient.ts) - Dedicated BSC Mainnet client with Infura API key
4. [`hooks/useBlockchainData.ts`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/hooks/useBlockchainData.ts) - React hooks for fetching blockchain data
5. [`hooks/useBscData.ts`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/hooks/useBscData.ts) - React hooks for fetching BSC data
6. [`components/blockchain-info.tsx`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/components/blockchain-info.tsx) - Example component using the hooks
7. [`components/bsc-info.tsx`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/components/bsc-info.tsx) - Component for displaying BSC data

## Basic Usage

### Simple Client Setup

```typescript
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

### Using the Client

```typescript
// Get latest block number
const blockNumber = await publicClient.getBlockNumber()

// Get account balance
const balance = await publicClient.getBalance({
  address: '0x...',
})

// Get gas price
const gasPrice = await publicClient.getGasPrice()
```

## BSC Mainnet Integration

We've integrated with BSC Mainnet using your Infura API key:

```typescript
import { createPublicClient, http } from 'viem'
import { bsc } from 'viem/chains'

const INFURA_BSC_API_KEY = 'cb6685b37a9840a68ce734bd5828a566'
const BSC_RPC_URL = `https://bsc-mainnet.infura.io/v3/${INFURA_BSC_API_KEY}`

export const bscClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_RPC_URL),
  batch: {
    multicall: true,
  },
})
```

### Using the BSC Client

```typescript
// Get latest BSC block number
const blockNumber = await bscClient.getBlockNumber()

// Get BNB balance
const balance = await bscClient.getBalance({
  address: '0x...',
})
```

## Advanced Features

### Multicall Batching

Enable multicall batching for improved performance when making multiple read requests:

```typescript
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
  batch: {
    multicall: true,
  },
})
```

With multicall enabled, multiple contract reads can be batched together:

```typescript
const [name, totalSupply, symbol] = await Promise.all([
  contract.read.name(),
  contract.read.totalSupply(),
  contract.read.symbol(),
])
```

### Multiple Chain Support

Clients for different chains are available:

```typescript
import { 
  mainnetPublicClient,
  bscPublicClient,
  sepoliaPublicClient,
  optimismPublicClient,
  polygonPublicClient
} from '@/lib/blockchainClient'

const mainnetBlock = await mainnetPublicClient.getBlockNumber()
const bscBlock = await bscPublicClient.getBlockNumber()
const sepoliaBlock = await sepoliaPublicClient.getBlockNumber()
```

## Environment Variables

For production usage, you should set up environment variables for RPC endpoints:

```env
NEXT_PUBLIC_MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
NEXT_PUBLIC_BSC_RPC_URL=https://bsc-mainnet.infura.io/v3/cb6685b37a9840a68ce734bd5828a566
NEXT_PUBLIC_MAINNET_WS_URL=wss://mainnet.infura.io/ws/v3/YOUR_PROJECT_ID
```

## React Integration

### Using the Hooks

```tsx
import { useBlockchainData } from '@/hooks/useBlockchainData'

export default function MyComponent() {
  const { blockNumber, gasPrice, isLoading, error } = useBlockchainData()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <p>Block Number: {blockNumber?.toString()}</p>
      <p>Gas Price: {gasPrice?.toString()} wei</p>
    </div>
  )
}
```

### Using the BSC Hooks

```tsx
import { useBscData } from '@/hooks/useBscData'

export default function BscComponent() {
  const { blockNumber, gasPrice, isLoading, error } = useBscData()
  
  if (isLoading) return <div>Loading BSC data...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      <p>BSC Block Number: {blockNumber?.toString()}</p>
      <p>Gas Price: {gasPrice?.toString()} wei</p>
    </div>
  )
}
```

## Performance Considerations

1. **Multicall Batching**: Enabled by default in our setup for better performance
2. **Caching**: Public clients automatically cache responses
3. **Polling**: The hooks include polling intervals for keeping data fresh
4. **Error Handling**: All hooks include proper error handling

## Next Steps

To expand on this setup, consider:

1. Adding wallet client functionality for write operations
2. Implementing contract interaction hooks
3. Adding more sophisticated error handling and retry logic
4. Integrating with state management solutions like Zustand or Redux
5. Setting up proper environment variables for production RPC endpoints
6. Extending support for additional chains like BSC Testnet
7. Implementing cross-chain functionality