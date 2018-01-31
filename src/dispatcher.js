const chalk = require('chalk')
const zmq = require('zmq')

const dispatcher = zmq.socket('push')

const run = (stream, port, batchSize = 10) => {
  dispatcher.bindSync(`tcp://*:${port}`)
  let batch = []

  stream
    .on('data', row => {
      batch.push(row)
      if (batch.length === batchSize) {
        dispatcher.send(JSON.stringify({ rows: batch }))
        batch = []
      }
    })
    .on('end', () => {
      dispatcher.send(JSON.stringify({ rows: batch }))
    })

  dispatcher.on('accept', () => {
    console.log(chalk.greenBright('Worker accepted'))
  })

  console.log(chalk.greenBright(`Dispatcher started at port: ${port}`))
}

module.exports = { run }
