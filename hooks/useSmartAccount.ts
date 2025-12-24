'use client'

import { useState, useEffect } from 'react'
import { 
  createSmartAccount, 
  sendUserOperation, 
  getUserOperationReceipt 
} from '@/lib/smartAccountsClient'

interface SmartAccountHook {
  smartAccount: any | null
  ownerAccount: any | null
  isCreating: boolean
  isSending: boolean
  userOpHash: string | null
  receipt: any | null
  error: string | null
  createAccount: (privateKey?: string) => Promise<void>
  sendTransaction: (to: `0x${string}`, value: string) => Promise<void>
  waitForReceipt: () => Promise<void>
}

export const useSmartAccount = (): SmartAccountHook => {
  const [smartAccount, setSmartAccount] = useState<any | null>(null)
  const [ownerAccount, setOwnerAccount] = useState<any | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [userOpHash, setUserOpHash] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const createAccount = async (privateKey?: string) => {
    setIsCreating(true)
    setError(null)
    
    try {
      const { smartAccount, ownerAccount } = await createSmartAccount(privateKey)
      setSmartAccount(smartAccount)
      setOwnerAccount(ownerAccount)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create smart account')
      console.error('Error creating smart account:', err)
    } finally {
      setIsCreating(false)
    }
  }

  const sendTransaction = async (to: `0x${string}`, value: string) => {
    if (!smartAccount) {
      setError('Smart account not initialized')
      return
    }

    setIsSending(true)
    setError(null)
    setUserOpHash(null)
    setReceipt(null)
    
    try {
      const hash = await sendUserOperation(smartAccount, to, value)
      setUserOpHash(hash)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send transaction')
      console.error('Error sending transaction:', err)
    } finally {
      setIsSending(false)
    }
  }

  const waitForReceipt = async () => {
    if (!userOpHash) {
      setError('No user operation hash available')
      return
    }

    try {
      const receipt = await getUserOperationReceipt(userOpHash)
      setReceipt(receipt)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get receipt')
      console.error('Error getting receipt:', err)
    }
  }

  return {
    smartAccount,
    ownerAccount,
    isCreating,
    isSending,
    userOpHash,
    receipt,
    error,
    createAccount,
    sendTransaction,
    waitForReceipt
  }
}