import { ScrollableListWrapper } from "../../wrappers"
import styles from "./notable-alumanis-section.module.css"
import { useRouter } from 'next/router'
import { SLUG_PAGES } from '../../../util/constants'
import ProfileCardV1 from "../../molecules/profile-card-v1/profile-card-v1"
import ViewMoreButton from "../../atoms/view-more-button/view-more-button"
import {removeMathchingSubString} from '../../../util/helper'

export default function NotableAlumaniSection({alumniList=[]}) {
    const {query} = useRouter()
    let {slug='',preview=false} = query || {}

    const prefixSlug = removeMathchingSubString(slug)

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