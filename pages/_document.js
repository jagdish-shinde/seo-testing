import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getIsProduction } from '../util/helper'

export default class MyDocument extends Document {
    render() {
      return (
        <Html lang="en">
          <Head>
            {getIsProduction() && <script 
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />}
            {/* <!-- Google Tag Manager --> */}
            {getIsProduction() && <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || []; 
                function gtag(){
                    dataLayer.push(arguments);
                } 
                gtag('js', new Date()); 
                gtag('config', 'G-JHNNCTQK08');`
              }}
            />}
            
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
    }
  }