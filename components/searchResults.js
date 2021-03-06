import styles from './searchResults.module.scss'
import React from 'react'
import { useAppContext } from '../context/AppWrapper'
import LoadingSpinner from './loadingSpinner'
import ResultItem from './resultItem'
const NoResults = () => <div className={styles.noResults}>No Results</div>

export default function SearchResults() {
  const {searchResults, isLoading} = useAppContext()
  const renderSearchResults = () => {
    const results = []
    for (const i in searchResults){
      results.push(<ResultItem key={i} {...searchResults[i]} />)
    }
    return results
  }
  const isResultsExist =  searchResults && searchResults.length > 0

  return (
    <div className={styles.container}>
      { isResultsExist ? renderSearchResults() : (!isLoading && <NoResults />) }
      { isLoading && <LoadingSpinner/>}
    </div>
  )
}