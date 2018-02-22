import { socket, Socket } from 'zmq'
enum Mode {
  Push = 'push',
  Pull = 'pull'
}

const bindSocket = (mode: Mode, port: number) => {
  const socket = getSocket(mode).bindSync(`tcp://*:${port}`)

  return socket
}

const connectSocket = (mode: Mode, port: number) => {
  const socket = getSocket(mode).connect(`tcp://localhost:${port}`)

  return socket
}

const getSocket = (mode: Mode) => {
  return socket(mode)
}

export { bindSocket, connectSocket, getSocket, Mode, Socket }
