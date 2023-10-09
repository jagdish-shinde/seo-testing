import React, { Fragment, useEffect, useState } from 'react'
import { Header } from '../../molecules'
import styles from './notable-alumanis.module.css'
import ProfileCardV1 from '../../molecules/profile-card-v1/profile-card-v1'
import BackNavigationButton from '../../atoms/back-navigation-button/back-Navigation-button'
import Image from 'next/image'
import { FooterSection } from '../../sections'
import Head from 'next/head'
import { getAlumniList } from '../../../apis'
import { useRouter } from 'next/router'
import { removePostFixFromSlug } from '../../../util/helper'
import { SLUG_PAGES } from '../../../util/constants'
import * as amplitude from '@amplitude/analytics-browser';
import WhatsappCommunityBtn from '../../atoms/whatsapp-community-btn/whatsapp-community-btn'
import { NotableAlumaniSkelton } from './notable-alumni-skelton'

function NotableAlumnis() {
  const [alumniList, setAlumniList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [collegeData, setCollegeData] = useState({collegeName:"", logo:""})
  const {query,isReady,push} = useRouter()
  let {slug} = query || {}

  async function getAlumaniDetails(){
    try {
      const pageSlug = removePostFixFromSlug(slug, SLUG_PAGES.notableAlumni)
      const {alumniData, collegeDetails} = await getAlumniList(pageSlug) || {}
      amplitude.track('SEO_PAGE_VISIT', {
        pageTitle : `${collegeDetails?.collegeName}: Notable Alumani's`,
        collegeName : collegeDetails?.collegeName
      });
      if(!alumniData || !collegeDetails) {
        console.log(alumniData)
        // push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
        return
      }
      setAlumniList(alumniData)
      setCollegeData(collegeDetails)
      setIsLoading(false)
    } catch (error) {
      push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
    } 
}

useEffect(()=>{
  if(!isReady) return
  if(!slug) {
      push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
      return
  }

  getAlumaniDetails();
},[isReady])
  if(isLoading){
    return ( <NotableAlumaniSkelton />)
  }
  return (
    <Fragment>
        <Header  customWrapperStyle={styles.headerStyle} pageTitle={`${collegeData?.collegeName}: Notable Alumni's`} collegeName={collegeData.collegeName}/>
        <Head>
                <title>{`${collegeData.collegeName}: Notable Alumni`}</title>
        </Head>
    <main className={styles.mainWrapper}>
        <div className={styles.backBtn}>
            <BackNavigationButton />
        </div>
        <div className={styles.collegeDetailsConatiner}>
          <div className={styles.collegeWrapper}>
            <picture className={styles.collegeLogo}>
                <Image 
                  src={collegeData?.logo || ''}
                  width={"100%"}
                  height={"100%"}
                  />
            </picture>
            <h1 className={styles.collegeName}>
              {`${collegeData?.collegeName}: Notable Alumni's`}
            </h1>
          </div>
        </div>
        <section className={styles.alumanisPhotoContainer}>
          <div className={styles.alumniSection}>
            {alumniList.map( (alumni, index) => (
              <ProfileCardV1 key={index} alumni={alumni}/>
              ))}
          </div>
        </section>
    </main>
    <FooterSection/>
    <WhatsappCommunityBtn pageTitle={`${collegeData?.collegeName}: Notable Alumni's`} collegeName={collegeData?.collegeName}/>
    </Fragment>
  )
}

export default NotableAlumnis