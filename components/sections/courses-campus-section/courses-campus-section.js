import Image from "next/image"
import { useState } from "react";
import { facilities, facilitiesWithLogo } from "../../../util/constants"
import { getCapitalFirstLetter } from "../../../util/helper"
import styles from "./courses-campus-section.module.css"
export function CoursesAndCampusSection({data}){
    const [isHovered, setIsHovered] = useState(false);
    const [idx,setIdx] = useState("")
    const {
        coursesOffered=[],
        facilities=[],
        collegeName='',
        totalAdmissions2022='',
        totalAdmissions2023=''
    } = data || {}

    const facilitiesWithIcon = []
    facilities.forEach(facility=>{
        facilitiesWithIcon.push({
            icon : facilitiesWithLogo[facility],
            heading : facility
        })
    })

    function handleHover(index){
        setIdx(index)
        setIsHovered(true)
    }

    return(
        <section className={styles.mainWrapper}>
            <h2  id="courses">What Courses are offered by {collegeName}?</h2>
            <hr></hr>
            <div className={`section-padding ${styles.wrapper}`}>
                <p>{getCapitalFirstLetter(collegeName)} offers the following courses in B.E and B.tech</p>
                <div className={styles.coursesList}>
                    {coursesOffered.map(({course,fee},index)=>
                        <p className={styles.course} key={index}>
                           {getCapitalFirstLetter(course)}
                        </p>
                    )}
                </div>
                    <div className={`${styles.facilitiesWrapper}`} id="campus">
                        {facilities?.length>0 && <h1 className={styles.facilityHeading}>Facilities <span>in Campus</span> </h1>}
                        <div>
                            {facilities?.length>0 && <div className={styles.facilitiesIconWrapper}>
                                {facilitiesWithIcon.map(({icon,heading},index)=>
                                    <div key={index}>
                                        <div className={styles.iconWrapper} >
                                            <div className={styles.logo}
                                            onMouseEnter={() => handleHover(index)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            >
                                                <Image
                                                    src={icon}
                                                    height="100%"
                                                    width="100%"
                                                    layout="fill"
                                                    objectFit="fill"
                                                    alt={`${heading} icon`}
                                                />
                                            </div>    
                                        </div>
                                       {isHovered && idx==index && <p className={styles.iconText}>{heading}</p>}
                                    </div>
                                )}
                            </div>}
                            {(totalAdmissions2022 || totalAdmissions2023) && 
                                <div className={`${styles.admissionWrapeer}`}>
                                    {totalAdmissions2023 && <p>Total Admissions in 2023 :  {totalAdmissions2023}</p>}
                                    {totalAdmissions2022 && <p>Total Admissions in 2022 :  {totalAdmissions2022}</p>}
                                </div>
                            }
                        </div>
                        
                    </div>
                
            </div>
        </section>
    )
}