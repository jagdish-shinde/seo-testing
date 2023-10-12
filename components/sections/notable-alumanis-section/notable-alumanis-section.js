import { useEffect, useState } from "react"
import { ScrollableListWrapper } from "../../wrappers"
import styles from "./notable-alumanis-section.module.css"
import { getAlumniList, getPageDetails  } from '../../../apis'
import { useRouter } from 'next/router'
import { removePostFixFromSlug } from '../../../util/helper'
import { SLUG_PAGES } from '../../../util/constants'
import ProfileCardV1 from "../../molecules/profile-card-v1/profile-card-v1"
import ViewMoreButton from "../../atoms/view-more-button/view-more-button"
import {removeMathchingSubString} from '../../../util/helper'

export default function NotableAlumaniSection() {
    const [alumniList, setAlumniList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {query,isReady,push} = useRouter()
    let {slug,preview=false} = query || {}

    const prefixSlug = removeMathchingSubString(slug)

  
    async function getAlumaniDetails(){
      try {
        const pageSlug = removePostFixFromSlug(slug, SLUG_PAGES.notableAlumni)
        const data = await getPageDetails({slug : pageSlug, preview})
        if(!data || !data?.alumniData){
          return
        }
        const {alumniData} = data
        setAlumniList(alumniData)
      } catch (error) {
        console.log(error.message)
      } finally{
        setIsLoading(false)
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

  if(isLoading || !alumniList || !alumniList.length){
    return null
  }
  return (
    <section className={styles.mainWrapper}>
        <h3>{`Notable Alumni's`}</h3>
        <div className={styles.scrollerWrapper}>
            <ScrollableListWrapper className={styles.scroller} areNavArrowsVisible={true} areDotsVisible={false} length={alumniList.length}>
                {alumniList.map( (alumni, index) => (
                    <ProfileCardV1 key={index} alumni={alumni}/>
                ))}
            </ScrollableListWrapper>
        </div>
{alumniList.length > 2 &&
        <ViewMoreButton btnText={'View All'} pathname={`/${prefixSlug}${SLUG_PAGES.notableAlumni}`}/>
        }
    </section>
  )
}