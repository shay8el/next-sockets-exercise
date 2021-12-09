import React, { createContext, useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const AppContext = createContext()
const URL = "/api/searchServer"
export function AppWrapper({ children }) {
  const [searchSocket, setSearchSocket] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch(URL).finally(() => {
      const socketIo = io('', { autoConnect: false })
      
      socketIo.on('connect', () => {
        const queryId = socketIo.id
        console.log(`query ${queryId} started`)
      })
      socketIo.on('results-batch', data => {
        const queryId = socketIo.id
        console.log(`batch for query ${queryId} arrived`)
        setSearchResults(data)
      })
      socketIo.on('found', () => {
        const queryId = socketIo.id
        console.log(`query ${queryId} finished`)
        setIsLoading(false)
      })
      socketIo.on('disconnect', () => {
        console.log('query canceled')
      })
      setSearchSocket(socketIo)
      function cleanup() {
        socketIo.disconnect()
      }
      return cleanup
    })
  }, [])

  const sendSearchQuery = (data) => {
    if (searchSocket){
      if (isLoading){ // does still there is a query running?
        console.log('cancel-previous-search')
        searchSocket.emit('stop-search')
      }
      searchSocket.disconnect()
      clearSearchResults()
      setIsLoading(true)
      searchSocket.connect()
      searchSocket.emit('search', data)
    } else {
      console.log('no search socket')
    }
  }

  const clearSearchResults = () => {setSearchResults([])}
  const sharedState = { sendSearchQuery, searchResults, clearSearchResults, isLoading }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext)
}