import Image from "next/image"
import { useRouter } from "next/router"
import { fstLogo } from "../../../public"
import styles from "./header.module.css"
import { whatsappLogo } from "../../../public"
import { WHATSAPP_COMMUNITY_GROUP_LINK } from "../../../util/constants"
import * as amplitude from '@amplitude/analytics-browser';
export function Header({
    customWrapperStyle,
    customLogoStyle,
    pageTitle,
    collegeName
}){
    const router = useRouter()
    function handleClick(){
        router.push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
    }
    function handleJoinWhatsapp(){
        amplitude.track('SEO_JOINED_WA_COMMUNITY', {
            pageTitle,
            collegeName,
            navigateFrom: "whatsapp-community-desktop-header"
          });
        window.open(WHATSAPP_COMMUNITY_GROUP_LINK, "_blank")
    }
    return(
        <div className={`${styles.mainWrapper} ${customWrapperStyle}`}>
            <picture className={`${styles.imgWrapper} ${customLogoStyle}`} onClick={()=>{handleClick()}}>
                <Image 
                    src={fstLogo}
                    height="100%"
                    width="100%"
                    objectFit="fill"
                    layout="fill"
                />
            </picture>
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