import { Client } from '@xmtp/xmtp-js'
import { ethers } from 'ethers'

async function connect() {
    await window.ethereum.send('eth_requestAccounts')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const xmtp = await Client.create(signer, {
      env: 'production'
    })
  }

const allConversations = await xmtp.conversations.list()
  
console.log(allConversations)