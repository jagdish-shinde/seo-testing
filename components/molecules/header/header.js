import Image from "next/image"
import { useRouter } from "next/router"
import { fstLogo, collegeShaalaLogo, csLogoWithFeather } from "../../../public"
import styles from "./header.module.css"
import { whatsappLogo } from "../../../public"
import { WHATSAPP_COMMUNITY_GROUP_LINK } from "../../../util/constants"
import * as amplitude from '@amplitude/analytics-browser';
export function Header({
    customWrapperStyle,
    customLogoStyle,
    pageTitle,
    collegeName='',
    degreeName=''
}){
    const router = useRouter()
    function handleClick(){
        router.push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
    }
    function handleJoinWhatsapp(){
        amplitude.track('SEO_JOINED_WA_COMMUNITY', {
            pageTitle,
            ...(collegeName && {collegeName}),
            navigateFrom: "whatsapp-community-desktop-header",
            ...(degreeName && {degreeName})
          });
        window.open(WHATSAPP_COMMUNITY_GROUP_LINK, "_blank")
    }
    return(
        <div className={`${styles.mainWrapper} ${customWrapperStyle}`}>
            <div className={styles.logoAndTextWrapper} onClick={()=>handleClick()}>
                <picture className={styles.logoWrapper}>
                    <Image 
                        src={csLogoWithFeather}
                        width = "100%"
                        height="100%"
                        objectFit="fill"
                        layout="fill"
                    />
                </picture>
                <div className={styles.jeeBookText}>
                    <p>CollegeShaala</p>
                    <p>by FunctionUp</p>
                </div>
            </div>
            <div className={styles.whatsappBtnConatiner} onClick={handleJoinWhatsapp}>
                <p>Join for Exam Updates</p>
                <picture className={styles.whatsappImageContainer} >
                    <Image 
                        src={whatsappLogo}
                        height="100%"
                        width="100%"
                    />
                </picture>
            </div>    
        </div>
    )
}