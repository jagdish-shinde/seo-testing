import '../styles/globals.css'
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import { RecoilRoot } from "recoil";
import * as amplitude from '@amplitude/analytics-browser';
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    },
    capture_pageview: true // Disable automatic pageview capture, as we capture manually
  })
}

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
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
      </PostHogProvider>
    </RecoilRoot>
  )
}

