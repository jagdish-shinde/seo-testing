import HtmlParser from "react-html-parser"
import styles from "./admission-and-fee-section.module.css"
export function ModeOfAdmissionAndFeeSection({modeOfAdmission=[],hostelFeeAndCourses={},collegeName=''}){

    const {coursesOffered=[],hostelFee=''} = hostelFeeAndCourses || {}
    const coursesWithFee = coursesOffered.filter(course=>String(course.fee).length>0)
    const updatedData = [{course : "Courses",fee:"SEMESTER FEE"},...coursesWithFee]
    return(
        <section >
            <h1 className={styles.heading} id="admission">Mode of Admission</h1>
            <hr></hr>
            <p className={styles.modeOfAdmsn}>{modeOfAdmission?.length ? HtmlParser(`Students appeared for Exams like <span>${modeOfAdmission.join(", ")}</span> are eligible.`) : `Students must have cleared 12th with Physics, Chemistry and Math from govt. recognised boards are eligible.`}</p>
            {coursesWithFee?.length>0 && <h1 className={styles.heading} id="fees">Fees</h1>}
            {coursesWithFee?.length<1 && <h1 className={styles.heading} id="fees">Hostel Fee</h1>}
             <hr></hr>
                <div className={`section-padding ${styles.wrapper}`}>
                    {coursesWithFee?.length>0 && <div className={styles.tableWrapper}>
                        {updatedData.filter(course=>String(course.fee).length>0).map(({course,fee},index)=>
                            <div className={styles.row} key={index}>
                                <p>{course}</p>
                                <p>{fee}</p>
                            </div>
                        )}
                    </div>}
                    {hostelFee && <h2>Hostel Fee Per Semester will be approx Rs {hostelFee} per month.</h2>}
                    {!hostelFee && <h2>Hostel Fees of {collegeName} is not available at the moment.</h2>}
                </div>
        </section>
    )
}