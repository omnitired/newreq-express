const Web3 = require('web3')
const contracts = require('./contracts')
const Provider = require('@truffle/hdwallet-provider')
require('dotenv').config()

const privatekey = process.env.PRIVATE_KEY
const rpcUrl = process.env.ALCHEMY_URL

const provider = new Provider(privatekey, rpcUrl)
const web3 = new Web3(provider)

async function sendEth (minutes, userAccount, amount, target) {
  const ethSender = new web3.eth.Contract(contracts.ethSender.abi, contracts.ethSender.address)
  const registery = new web3.eth.Contract(contracts.registery.abi, contracts.registery.address)

  const time = Date.now() + (minutes * 60 * 1000)
  const callData = ethSender.methods.sendEthAtTime(time, userAccount).encodeABI()
  const referer = '0x8690b9429813e95a3999eA70c760dff932572D85'
  const ethForCall = web3.utils.toWei(String(amount))

  const res = await registery.methods.newReq(target, referer, callData, ethForCall,false, false, false)
  .send({from: userAccount, value: web3.utils.toWei(String(amount + 0.01))})
  console.log(res)
  return res.transactionHash

}

module.exports=sendEth
