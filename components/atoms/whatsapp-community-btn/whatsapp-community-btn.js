import Image from "next/image"
import { whatsappLogo } from "../../../public"
import styles from "./whatsapp-community-btn.module.css"
import { WHATSAPP_COMMUNITY_GROUP_LINK } from "../../../util/constants"
import * as amplitude from '@amplitude/analytics-browser';

export default function WhatsappCommunityBtn({pageTitle, collegeName='', degreeName='',containerStyle}) {
    function handleJoinWhatsapp(){
        amplitude.track('SEO_JOINED_WA_COMMUNITY', {
            pageTitle,
            navigateFrom: "whatsapp-community-mobile-bottom",
            ...(collegeName && {collegeName}),
            ...(degreeName && {degreeName})
          });
        window.open(WHATSAPP_COMMUNITY_GROUP_LINK, "_blank")
    }
  return (
    <div className={`${styles.mainContainer} ${containerStyle}`}>
        <div className={styles.btnWrapper} onClick={handleJoinWhatsapp}>
            <button className={styles.btn}>
                Join for Exam Updates
            </button>
            <picture className={styles.whatsappImageContainer} >
                    <Image 
                        src={whatsappLogo}
                    />
                </picture>
        </div>
    </div>
  )
}