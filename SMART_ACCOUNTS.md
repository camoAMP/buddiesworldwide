# MetaMask Smart Accounts Kit Implementation

This document explains how to use the MetaMask Smart Accounts Kit in this project, following the quickstart guide.

## Installation

The MetaMask Smart Accounts Kit has been installed in the project:

```bash
npm install @metamask/smart-accounts-kit --legacy-peer-deps
```

## Files Created

1. [`lib/smartAccountsClient.ts`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/lib/smartAccountsClient.ts) - Smart Accounts client configuration and utility functions
2. [`hooks/useSmartAccount.ts`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/hooks/useSmartAccount.ts) - React hook for managing smart account state
3. [`components/smart-account-demo.tsx`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/components/smart-account-demo.tsx) - UI component demonstrating smart account functionality
4. [`app/smart-accounts-demo/page.tsx`](file:///media/camo/1tbdrive/connect-sync-saa-s-app%20(3)/app/smart-accounts-demo/page.tsx) - Demo page showcasing the implementation

## Implementation Overview

### 1. Public Client Setup

We set up a Viem Public Client to interact with the blockchain:

```typescript
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.SEPOLIA_RPC_URL || undefined),
})
```

### 2. Bundler Client Setup

We created a Bundler Client to handle user operations:

```typescript
import { createBundlerClient } from 'viem/account-abstraction'

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http(
    process.env.BUNDLER_RPC_URL || 'https://sepolia-bundler.etherspot.io'
  ),
})
```

### 3. Smart Account Creation

We implemented a function to create MetaMask smart accounts:

```typescript
import { toMetaMaskSmartAccount, Implementation } from '@metamask/smart-accounts-kit'
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount(privateKey)
const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: '0x0',
  signer: { account },
})
```

### 4. Sending User Operations

We created functions to send user operations through the bundler:

```typescript
const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    {
      to: recipientAddress,
      value: parseEther(amount),
    },
  ],
  maxFeePerGas,
  maxPriorityFeePerGas,
})
```

## Usage

To use the smart accounts functionality:

1. Visit `/smart-accounts-demo` in your application
2. Click "Create Smart Account" to initialize a new smart account
3. Enter a recipient address and amount
4. Click "Send Transaction" to execute a user operation

## Key Features

1. **Hybrid Implementation**: Supports both EOA owners and passkey signers
2. **Automatic Deployment**: Smart accounts are deployed on first use
3. **User Operations**: Transactions are submitted as ERC-4337 user operations
4. **Receipt Tracking**: Wait for transaction receipts after submission
5. **Error Handling**: Proper error handling and user feedback

## Next Steps

To enhance this implementation, consider:

1. Integrating with actual wallet providers (MetaMask, WalletConnect)
2. Implementing secure key management practices
3. Adding support for multiple signing methods (passkeys, hardware wallets)
4. Implementing account recovery mechanisms
5. Adding support for paying gas fees with ERC-20 tokens
6. Creating delegation capabilities for account permissions

## Security Considerations

- Never hardcode private keys in production applications
- Use secure key management solutions
- Validate all user inputs
- Implement proper authentication and authorization
- Use trusted bundler services
- Handle errors securely without exposing sensitive information

## Resources

- [MetaMask Smart Accounts Kit Documentation](https://docs.metamask.io/smart-accounts-kit/)
- [ERC-4337 Standard](https://eips.ethereum.org/EIPS/eip-4337)
- [Viem Documentation](https://viem.sh/)