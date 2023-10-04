import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import {downArrow  } from '../../../public'
import { Header, NavigationDialog } from '../../molecules'
import styles from './hero-section.module.css'
import {facilitiesWithIcon} from "../../../util/constants"
import { getCapitalFirstLetter } from '../../../util/helper'
import * as amplitude from '@amplitude/analytics-browser';

export function HeroSection({heroSectionData}){
    const [selectedValue,setSelectedValue] = useState("Quick navigation")
    const [isDialogOpen,setIsDialogOpen] = useState(false)
    const {name='',logo='',desktopImage='',mobileImage=''} = heroSectionData || {}

    function handleScroll(path,keyVl="desktop",value=''){
        const targetSection = document.querySelector(path);
        amplitude.track('SEO_NAVIGATE_COLLEGE_PAGE', {
            pageTitle : name,
            collegeName : name,
            navigateTo : path.replace("#",""),
        });
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        if(keyVl=="mobile"){
            setSelectedValue(value)
            setIsDialogOpen(false)
        }
    }

    useEffect(()=>{
        amplitude.track('SEO_PAGE_VISIT', {
            pageTitle : name,
            collegeName : name
          });
    },[])

    return(
        <Fragment>
        <section className={`${styles.mainWrapper} ${desktopImage ? styles.backgroundImage : ""}`} 
            style={desktopImage ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${desktopImage})` } : {background:"#2A289C"}}
            >
            <Header/>
            <div className={styles.wrapper}>
                <div className={styles.collegeNameAndLogoWrapper}>
                    <div className={styles.logoWrapper}>
                        <div className={styles.logo}>
                            <Image
                                src={logo}
                                width = "100%"
                                height="100%"
                                objectFit='fill'
                                layout='fill'                        
                            />
                        </div>
                    </div>
                    <h2>{getCapitalFirstLetter(name)}</h2>
                    <p>Address, Photos,  Placement, Admission Process, Fess in 2024</p>
                </div>
                <div className={styles.facilitiesWrapper}>
                    {facilitiesWithIcon.map(({icon,heading,id},index)=>
                        <div className={styles.facility} onClick={()=>{handleScroll(id)}} key={index}>
                            <div className={styles.facilityIcon}>
                                <Image 
                                    src={icon}
                                    width="100%"
                                    height="100%"
                                    objectFit='fill'
                                    layout='fill'
                                />
                            </div>
                            <p>{heading}</p>
                        </div>
                     
                    )}
                </div>
            </div>
        </section>

        <section className={`${styles.mobileWrapper} ${mobileImage ? styles.backgroundImage : ""}` }
            style={mobileImage ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${mobileImage})` } : {background:"#2A289C"}}

        >
            <Header/>
            <div className={styles.mobileWrapper}>
                <div className={styles.collegeNameAndLogoWrapper}>
                    <div className={styles.logoWrapper}>
                        <div className={styles.logo}>
                            <Image
                                src={logo}
                                width = "100%"
                                height="100%"
                                objectFit='fill'
                                layout='fill'                        
                            />
                        </div>
                    </div>
                    <h2>{getCapitalFirstLetter(name)}</h2>
                    <p>Address, Photos,  Placement, Admission Process, Fess in 2024</p>
                </div>
                <div className={styles.quickNavigation} onClick={()=>setIsDialogOpen(true)}>
                    <p>{selectedValue}</p>
                    <div>
                        <Image
                            src={downArrow}    
                        />
                    </div>
                </div>
            </div>
            <NavigationDialog 
                isOpen={isDialogOpen}
                options={facilitiesWithIcon}
                handleOnItemClick={handleScroll}
                setIsDialogOpen = {setIsDialogOpen}
            />
        </section>
        </Fragment>
        
    )
}