import { Server } from 'socket.io'
import { search } from '../../utills/search'

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server)
    io.on('connection', socket => {
      const onResultFetch = (results) => socket.emit('results-batch', results)
      socket.on('search', async(data) => {
        const results = await search(data, onResultFetch)
          socket.emit('found', results)
      })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler