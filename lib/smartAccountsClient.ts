import { createPublicClient, createWalletClient, http, parseEther } from 'viem'
import { sepolia } from 'viem/chains'
import { createBundlerClient } from 'viem/account-abstraction'
import { toMetaMaskSmartAccount, Implementation } from '@metamask/smart-accounts-kit'
import { privateKeyToAccount } from 'viem/accounts'

// Set up a Viem Public Client
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.SEPOLIA_RPC_URL || undefined),
})

// Set up a Viem Bundler Client
export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http(
    process.env.BUNDLER_RPC_URL || 'https://sepolia-bundler.etherspot.io'
  ),
})

// Create a smart account instance (this would typically be done with a connected wallet)
// For demo purposes, we're using a dummy private key
export const createSmartAccount = async (privateKey?: string) => {
  // In a real application, you would get this from a connected wallet
  const account = privateKeyToAccount(
    (privateKey || process.env.DEMO_PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80') as `0x${string}`
  )

  // Create a MetaMask smart account
  const smartAccount = await toMetaMaskSmartAccount({
    client: publicClient,
    implementation: Implementation.Hybrid,
    deployParams: [account.address, [], [], []],
    deploySalt: '0x0',
    signer: { account },
  })

  return { smartAccount, ownerAccount: account }
}

// Function to send a user operation
export const sendUserOperation = async (smartAccount: any, to: `0x${string}`, value: string) => {
  // In a real application, you would need to determine appropriate fee values
  const maxFeePerGas = 1000000000n // 1 gwei
  const maxPriorityFeePerGas = 1000000000n // 1 gwei

  try {
    const userOperationHash = await bundlerClient.sendUserOperation({
      account: smartAccount,
      calls: [
        {
          to,
          value: parseEther(value),
        },
      ],
      maxFeePerGas,
      maxPriorityFeePerGas,
    })

    return userOperationHash
  } catch (error) {
    console.error('Error sending user operation:', error)
    throw error
  }
}

// Function to get transaction receipt
export const getUserOperationReceipt = async (userOpHash: string) => {
  return await bundlerClient.waitForUserOperationReceipt({
    hash: userOpHash as `0x${string}`,
  })
}