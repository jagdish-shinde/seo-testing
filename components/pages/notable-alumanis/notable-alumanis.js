import React, { Fragment, useEffect, useState } from 'react'
import { Header } from '../../molecules'
import styles from './notable-alumanis.module.css'
import ProfileCardV1 from '../../molecules/profile-card-v1/profile-card-v1'
import BackNavigationButton from '../../atoms/back-navigation-button/back-navigation-button'
import Image from 'next/image'
import { FooterSection } from '../../sections'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as amplitude from '@amplitude/analytics-browser';
import WhatsappCommunityBtn from '../../atoms/whatsapp-community-btn/whatsapp-community-btn'

function NotableAlumnis({data}) {
  const {query,isReady,push} = useRouter()
  const [isMobileView,setIsMobileView] = useState(false)

  const {alumniData=[],collegeDetails={}} = data || {}

    useEffect(()=>{
        if(!isReady) return
        amplitude.track('SEO_PAGE_VISIT', {
          pageTitle : `${collegeDetails?.collegeName}: Notable Alumani's`,
          collegeName : collegeDetails?.collegeName
        });
    },[isReady])

    useEffect(() => {
      function handleResize() {
        const isMobile = window.innerWidth <= 768;
        setIsMobileView(isMobile);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <Fragment>
        <Header  customWrapperStyle={styles.headerStyle} pageTitle={`${collegeDetails?.collegeName}: Notable Alumni`} collegeName={collegeDetails.collegeName}/>
        <Head>
            <title>{`${collegeDetails?.collegeName}: Notable Alumni`}</title>
            <meta name='description' content={`Explore the achievements of ${collegeDetails?.collegeName} alumni who have made their mark in various fields. Learn about their inspiring journeys and contributions. Discover the pride of ${collegeDetails?.collegeName}.`}/>
        </Head>
      <main className={styles.mainWrapper}>
          <div className={styles.backBtn}>
              {isMobileView && <BackNavigationButton />}
          </div>
          <div className={styles.collegeDetailsConatiner} style={{marginTop: isMobileView ? "" :"1.5rem"}}>
            <div className={styles.collegeWrapper}>
              <picture className={styles.collegeLogo}>
                  <Image 
                    src={collegeDetails?.logo || ''}
                    width={"100%"}
                    height={"100%"}
                    alt={`${collegeDetails?.collegeName} Logo`}
                    />
              </picture>
              <h1 className={styles.collegeName}>
                {`${collegeDetails?.collegeName}: Notable Alumni`}
              </h1>
              <h2 className={styles.subHeading}>
                {`Explore the achievements of ${collegeDetails?.collegeName} notable alumni who have made their mark in various fields. Learn about their inspiring journeys and contributions. Discover the pride of ${collegeDetails?.collegeName}.`}
              </h2>
            </div>
          </div>
          <section className={styles.alumanisPhotoContainer}>
            <div className={styles.alumniSection}>
              {alumniData.map( (alumni, index) => (
                <ProfileCardV1 key={index} alumni={alumni} collegeName={collegeDetails?.collegeName}/>
                ))}
            </div>
          </section>
      </main>
      <FooterSection/>
      <WhatsappCommunityBtn pageTitle={`${collegeDetails?.collegeName}: Notable Alumni`} collegeName={collegeDetails?.collegeName}/>
    </Fragment>
  )
}

export default NotableAlumnis