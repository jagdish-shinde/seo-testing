import Image from "next/image"
import { Fragment } from "react"
import {fstLogoBlue } from "../../../public"
import { footerBtns, fstOfferings, socialIconWithLink } from "../../../util/constants"
import styles from "./footer-section.module.css"
export function FooterSection(){
    function handleIconClick(link){
        if(!link) return
        window.open(link,'_blank')
    }
    return(
        <footer className={`section-padding ${styles.mainWrapper}`}>
            <div>
                <div className={styles.logoWrapper}>
                    <Image
                        src={fstLogoBlue}
                        width="100%"
                        height="100%"
                        objectFit="fill"
                        layout="fill"
                    />
                </div>
                <div className={styles.offering}>
                    <h5>FunctionUp's Offering</h5>
                    {fstOfferings.map((offering,index)=><p key={index}>{offering}</p>)}
                </div>
            </div>
            {/* <div className={styles.offeringsAndSocialIcons}>
                <div className={styles.socialFollow}>
                    {/* <div>
                        <h5>Follow us on</h5>
                        <div className={styles.iconWrapper}>
                            {socialIconWithLink.map(({icon,link=''},index)=>
                                <div className={styles.socialIcon} onClick={()=>handleIconClick(link)} key={index}>
                                    <Image
                                        src={icon}
                                        width="100%"
                                        height="100%"
                                        objectFit="fill"
                                        layout="fill"
                                    />
                                </div>
                            )}
                        </div>
                    </div> */}
                    
                    <div>
                        <div className={styles.footerBtns}>
                            {footerBtns.map(({text,link},index)=>
                                <Fragment key = {index}>
                                    <p className={styles.footerBtnText}>{text}</p>
                                    <p>|</p>
                                </Fragment>
                            )}
                        </div>
                    </div>
        </footer>
    )
}