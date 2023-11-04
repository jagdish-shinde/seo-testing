import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import {blurImg, downArrow  } from '../../../public'
import { ContentNavbar, Header, NavigationDialog } from '../../molecules'
import styles from './hero-section.module.css'
import {facilitiesWithIcon} from "../../../util/constants"
import { getCapitalFirstLetter } from '../../../util/helper'
import * as amplitude from '@amplitude/analytics-browser';
import { useInView } from 'react-intersection-observer';

export function HeroSection({heroSectionData,isPlacementSectionVisible=false,inHeaderView=false,intersectionRef}){
    const [selectedValue,setSelectedValue] = useState("Quick navigation")
    const [isDialogOpen,setIsDialogOpen] = useState(false)
    const {name='',logo='',desktopImage='',mobileImage=''} = heroSectionData || {}
    const updatedFacilities = []
    const [ref,inView] = useInView()

    facilitiesWithIcon.forEach(facility=>{
        if(facility?.heading=="Placements" && !isPlacementSectionVisible){
            return
        }
        updatedFacilities.push(facility)
    })
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
            <Header pageTitle={name} collegeName={name} customWrapperStyle={!inHeaderView ? styles.scrolledHeader : ""}/>

            <div className={styles.wrapper} >
                <div className={styles.collegeNameAndLogoWrapper}>
                    <div className={styles.logoWrapper}>
                        <div className={styles.logo} ref={intersectionRef}>
                            <Image
                                src={logo}
                                width = "100%"
                                height="100%"
                                objectFit='fill'
                                layout='fill' 
                                placeholder='blur'
                                blurDataURL={blurImg}   
                                alt={`${name} Logo`}                    
                            />
                        </div>
                    </div>
                    <h1>{`Is ${getCapitalFirstLetter(name)} Good?`}</h1>
                    <p>Address, Photos,  Placement, Admission Process, Fees in 2024</p>
                </div>
                <ContentNavbar
                    data={updatedFacilities}
                    handleClick = {handleScroll}
                    isDialogOpen = {isDialogOpen}
                    setIsDialogOpen = {setIsDialogOpen}
                    selectedValue = {selectedValue}
                />
            </div>
        </section>

        <section className={`${styles.mobileWrapper} ${mobileImage ? styles.backgroundImage : ""}` }
            style={mobileImage ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${mobileImage})` } : {background:"#2A289C"}}
        >
            <Header pageTitle={name} collegeName={name} customWrapperStyle={!inView ? styles.scrolledHeader : ""}/>
            <div className={styles.mobileWrapper}>
                <div className={styles.collegeNameAndLogoWrapper}>
                    <div className={styles.logoWrapper} ref={ref}>
                        <div className={styles.logo}>
                            <Image
                                src={logo}
                                width = "100%"
                                height="100%"
                                objectFit='fill'
                                layout='fill'   
                                alt={`${name} Logo`}                     
                            />
                        </div>
                    </div>
                    <h1>{`Is ${getCapitalFirstLetter(name)} Good?`}</h1>
                    <p>Address, Photos,  Placement, Admission Process, Fees in 2024</p>
                </div>
                <ContentNavbar
                    data={updatedFacilities}
                    handleClick = {handleScroll}
                    isDialogOpen = {isDialogOpen}
                    setIsDialogOpen = {setIsDialogOpen}
                    selectedValue = {selectedValue}
                />
            </div>
        </section>
        </Fragment>
    )
}