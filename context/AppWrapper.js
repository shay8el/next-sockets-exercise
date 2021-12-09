import React, { createContext, useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const AppContext = createContext()
const URL = '/api/searchServer'
export function AppWrapper({ children }) {
  const [searchSocket, setSearchSocket] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    fetch(URL)
    let socketIo = io()
    socketIo.on('results-batch', data => {
      setSearchResults(data)
    })
    socketIo.on('found', () => {
      setIsLoading(false)
    })
    socketIo.on('disconnect', () => {
      setIsLoading(false)
    })
    setSearchSocket(socketIo)
    function cleanup() {
      socketIo.disconnect()
    }
    return cleanup
  }, [])
  const sendSearchQuery = (data) => {
    clearSearchResults()
    if (searchSocket){
      if (isLoading){
        console.log('cancel-previous-search')
        searchSocket.emit('stop-search')
      }
      setIsLoading(true)
      searchSocket.emit('search', data)
    } else {
      console.log('no searchSocket')
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