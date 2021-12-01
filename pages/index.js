import Head from 'next/head'
import SearchTopBar from '../components/searchTopBar'
import SearchResults from '../components/searchResults'
import { AppWrapper } from '../context/AppWrapper'

export default function Home() {
  return (
    <AppWrapper>
      <Head>
        <title>WeSki Search</title>
      </Head>
      <SearchTopBar/>
      <SearchResults/>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #f0f0f0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </AppWrapper>
  )
}
