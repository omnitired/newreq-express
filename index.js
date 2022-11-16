const express = require('express')
const bodyParser = require('body-parser')
const { Webhook } = require('discord-webhook-node')
const sendEth = require('./sendEth')
require('dotenv').config()

const app = express()
const port = 3000
app.use(bodyParser.json())

const webHook = process.env.DISCORD_WEBHOOK
const hook = new Webhook(webHook)

app.post('/', async (req, res) => {
  const {amount, userAccount, minutes, target} = req.body
  const hash = await sendEth(minutes, userAccount, amount, target)
  hook.send("new transaction hash!:" + hash)
  res.send({
    hash
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
