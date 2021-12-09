import { Server } from 'socket.io'
import { search } from '../../utills/search'

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    io.on('connection', socket => {
      console.log(`query ${socket.id} started`)
      const onResultFetch = (results) => socket.emit('results-batch', results)
      socket.on('search', async(data) => {
        const results = await search(data, onResultFetch)
        socket.emit('found', results)
      })
      socket.on('stop-search', async() => {
        socket.disconnect()
        console.log(`query ${socket.id} canceled`)
      })
    })
    res.socket.server.io = io
  } else {
    console.log('query already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler