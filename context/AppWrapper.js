import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AppContext = createContext()
const URL = '/api/search'
export function AppWrapper({ children }) {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const sendSearchQuery = (data) => {
    setIsLoading(true)
    axios.get(URL, {
      params : data
    }).then((response) => {
      const {results} = response.data
      setSearchResults(results)
    }).catch((err) => {
      console.error(err)
    }).finally(()=>{
      setIsLoading(false)
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