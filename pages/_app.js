import '../styles/globals.css'
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { RecoilRoot } from "recoil";
import * as amplitude from '@amplitude/analytics-browser';

export default function MyApp({ Component, pageProps }) {
  const [isLoading,setIsLoading] = useState(true)
  const router = useRouter()
  const {isReady} = router || {}

  useEffect(()=>{
    if(!isReady) return
    setIsLoading(false)
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY);
  },[isReady])

  if(isLoading) {
    return null
  }

  return (
    <RecoilRoot>
      <Head>
          <link rel="icon" href="./svgs/csTransparentLogo.svg"/>
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
          />
          <meta name="theme-color" content="#000000" />
          <title>FunctionUp School Of Technology</title>
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

