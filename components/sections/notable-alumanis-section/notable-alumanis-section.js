import { ScrollableListWrapper } from "../../wrappers"
import styles from "./notable-alumanis-section.module.css"
import { useRouter } from 'next/router'
import { SLUG_PAGES } from '../../../util/constants'
import ProfileCardV1 from "../../molecules/profile-card-v1/profile-card-v1"
import ViewMoreButton from "../../atoms/view-more-button/view-more-button"

export default function NotableAlumaniSection({alumniList=[],isMobileView=false, collegeName=''}) {

    const prefixSlug = collegeName?.trim()?.toLowerCase()?.replaceAll(' ', '-')

    return (
      <section className={styles.mainWrapper}>
          <h3>{`Notable Alumni`}</h3>
          <div className={styles.scrollerWrapper}>
              <ScrollableListWrapper className={styles.scroller} areNavArrowsVisible={true} areDotsVisible={false} length={alumniList.length}>
                  {alumniList.map( (alumni, index) => (
                      <ProfileCardV1 key={index} alumni={alumni} collegeName={collegeName}/>
                  ))}
              </ScrollableListWrapper>
          </div>
          {alumniList.length > 2 &&
            <ViewMoreButton btnText={'View All'} pathname={`/${prefixSlug}${SLUG_PAGES.notableAlumni}`} isOpenInNewWindow={!isMobileView}/>
          }
      </section>
    )
}