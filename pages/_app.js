import '../styles/globals.css'
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  const [isLoading,setIsLoading] = useState(true)
  const router = useRouter()
  const {isReady} = router || {}

  
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/svgs/title-logo.svg"/>
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
          />
          <meta name="theme-color" content="#000000" />
          <title>FunctionUp School Of Technology</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}

