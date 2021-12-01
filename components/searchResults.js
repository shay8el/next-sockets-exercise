import styles from './searchResults.module.css'
import { useAppContext } from '../context/AppWrapper'
import LoadingSpinner from './loadingSpinner'
const NoResults = () => <div className={styles.noResults}>No Results</div>

export default function SearchResults() {
  const {searchResults, isLoading} = useAppContext()
  const renderSearchResults = () => {
    const results = []
    console.log(searchResults)
    for (const i in searchResults){
      const { name, rating, people, price, currency } = searchResults[i]
      results.push(
        <div key={i} className={styles.item}>
          <h1>{name}</h1>
          <p>{rating} stars</p>
          <p>{people} people</p>
          <p>{price}{currency}</p>
        </div>
      )
    }
    return results
  }
  const isResultsExist = searchResults && searchResults.length > 0

  return (
    <div className={styles.container}>
      { isLoading ? <LoadingSpinner/> :
      ( isResultsExist ? renderSearchResults() : <NoResults /> )}
    </div>
  )
}