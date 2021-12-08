import React, { createContext, useContext, useState } from 'react'
import io from 'socket.io-client'

const AppContext = createContext()
const URL = '/api/searchServer'
export function AppWrapper({ children }) {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const sendSearchQuery = (data) => {
    setIsLoading(true)
    fetch(URL).finally(() => {
      const socket = io()
      socket.emit('search', data)
      socket.on('results-batch', data => {
        setSearchResults(data)
      })
      socket.on('found', () => {
        setIsLoading(false)
      })
      socket.on('disconnect', () => {
        setIsLoading(false)
      })
    })
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