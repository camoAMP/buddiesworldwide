import { bscClient } from '@/lib/bscClient'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test the connection by fetching the current block number
    const blockNumber = await bscClient.getBlockNumber()
    
    // Get the current gas price
    const gasPrice = await bscClient.getGasPrice()
    
    return NextResponse.json({
      success: true,
      data: {
        blockNumber: blockNumber.toString(),
        gasPrice: gasPrice.toString(),
        timestamp: new Date().toISOString(),
        network: 'BSC Mainnet',
        provider: 'Infura'
      }
    })
  } catch (error) {
    console.error('BSC connection test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}