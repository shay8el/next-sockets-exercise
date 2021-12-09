import React from 'react'
import Head from 'next/head'
import SearchTopBar from '../components/searchTopBar'
import SearchResults from '../components/searchResults'
import { AppWrapper } from '../context/AppWrapper'

export default function Home() {
  return (
    <AppWrapper>
      <Head>
        <title>WeSki Search</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap" rel="stylesheet" />
      </Head>
      <SearchTopBar/>
      <SearchResults/>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #f0f0f0;
          font-family: 'Readex Pro', sans-serif;
        }
      `}</style>
    </AppWrapper>
  )
}
