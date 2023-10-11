import React, { Fragment, useEffect, useState } from 'react'
import { Header } from '../../molecules'
import styles from './notable-alumanis.module.css'
import ProfileCardV1 from '../../molecules/profile-card-v1/profile-card-v1'
import BackNavigationButton from '../../atoms/back-navigation-button/back-navigation-button'
import Image from 'next/image'
import { FooterSection } from '../../sections'
import Head from 'next/head'
import { getAlumniList, getPageDetails } from '../../../apis'
import { useRouter } from 'next/router'
import { removePostFixFromSlug } from '../../../util/helper'
import { SLUG_PAGES } from '../../../util/constants'
import * as amplitude from '@amplitude/analytics-browser';
import WhatsappCommunityBtn from '../../atoms/whatsapp-community-btn/whatsapp-community-btn'
import { NotableAlumaniSkelton } from './notable-alumni-skelton'

function NotableAlumnis({data}) {
  const [collegeData, setCollegeData] = useState({collegeName:"", logo:""})
  const {query,isReady,push} = useRouter()
  let {slug, preview=false} = query || {}

  const {alumniData=[],collegeDetails={}} = data || {}

    useEffect(()=>{
        if(!isReady) return
        amplitude.track('SEO_PAGE_VISIT', {
          pageTitle : `${collegeDetails?.collegeName}: Notable Alumani's`,
          collegeName : collegeDetails?.collegeName
        });
    },[isReady])


  return (
    <Fragment>
        <Header  customWrapperStyle={styles.headerStyle} pageTitle={`${collegeDetails?.collegeName}: Notable Alumni's`} collegeName={collegeDetails.collegeName}/>
        <Head>
            <title>{`${collegeDetails?.collegeName}: Notable Alumni`}</title>
        </Head>
      <main className={styles.mainWrapper}>
          <div className={styles.backBtn}>
              <BackNavigationButton />
          </div>
          <div className={styles.collegeDetailsConatiner}>
            <div className={styles.collegeWrapper}>
              <picture className={styles.collegeLogo}>
                  <Image 
                    src={collegeDetails?.logo || ''}
                    width={"100%"}
                    height={"100%"}
                    />
              </picture>
              <h1 className={styles.collegeName}>
                {`${collegeDetails?.collegeName}: Notable Alumni's`}
              </h1>
            </div>
          </div>
          <section className={styles.alumanisPhotoContainer}>
            <div className={styles.alumniSection}>
              {alumniData.map( (alumni, index) => (
                <ProfileCardV1 key={index} alumni={alumni}/>
                ))}
            </div>
          </section>
      </main>
      <FooterSection/>
      <WhatsappCommunityBtn pageTitle={`${collegeDetails?.collegeName}: Notable Alumni's`} collegeName={collegeDetails?.collegeName}/>
    </Fragment>
  )
}

export default NotableAlumnis