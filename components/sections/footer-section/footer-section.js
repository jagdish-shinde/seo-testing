import Image from "next/image"
import {collegeShala} from "../../../public"
import {fstOfferings } from "../../../util/constants"
import styles from "./footer-section.module.css"
export function FooterSection(){
    function handleIconClick(link){
        if(!link) return
        window.open(link,'_blank')
    }
    function handlePageRequest (pageUrl) {
        pageUrl && window.open(pageUrl, '_blank')
    }
    return(
        <footer className={`section-padding ${styles.mainWrapper}`}>
            <div>
                <div className={styles.logoAndTxtWrapper}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src={collegeShala}
                            width="100%"
                            height="100%"
                            objectFit="fill"
                            layout="fill"
                            alt="collegeshaala logo"
                        />
                    </div>
                    <div className={styles.collegeShala}>
                        <p>CollegeShaala</p>
                        <p>by FunctionUp</p>
                    </div>
                    </div>
                <div className={styles.offering}>
                    <h5>FunctionUp&apos;s Offering</h5>
                    {fstOfferings.map(({text, link},index)=>
                        <p 
                            key={index} 
                            className={styles.footerCourses}
                            onClick={()=>handlePageRequest(link)}
                        >{text}</p>
                    )}
                </div>
            </div>
            {/* <div className={styles.offeringsAndSocialIcons}>
                <div className={styles.socialFollow}>
                    // {/* <div>
                    //     <h5>Follow us on</h5>
                    //     <div className={styles.iconWrapper}>
                    //         {socialIconWithLink.map(({icon,link=''},index)=>
                    //             <div className={styles.socialIcon} onClick={()=>handleIconClick(link)} key={index}>
                    //                 <Image
                    //                     src={icon}
                    //                     width="100%"
                    //                     height="100%"
                    //                     objectFit="fill"
                    //                     layout="fill"
                    //                 />
                    //             </div>
                    //         )}
                    //     </div>
                    // </div> */}
                    
                    {/* <div>
                        <div className={styles.footerBtns}>
                            {footerBtns.map(({text,link},index)=>
                                <Fragment key = {index}>
                                    <p className={styles.footerBtnText}>{text}</p>
                                    <p>|</p>
                                </Fragment>
                            )}
                        </div>
                    </div> */}
        </footer>
    )
}