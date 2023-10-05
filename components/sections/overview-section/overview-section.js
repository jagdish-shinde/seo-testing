import { useRouter } from "next/router"
import { getCapitalFirstLetter } from "../../../util/helper"
import styles from "./overview-section.module.css"

export function OverviewSection({data}){
    const router = useRouter()
    const {query , push} = router || {}
    const {slug,preview=false} = query || {}
    const {
        city = '',
        state = '',
        establishedIn ='',
        instituteType = '',
        courseDegree ='',
        functionupRating ='',
        coursesOffered =[],
        campusPhotos=[]
    } = data || {}

    const overViewTableData =[
        {keyName : "Location" , value : `${getCapitalFirstLetter(city)}, ${getCapitalFirstLetter(state)}`},
        {keyName : "Established In" , value : establishedIn},
        {keyName : "Institute Type" , value : getCapitalFirstLetter(instituteType)},
        {keyName : `Courses (${getCapitalFirstLetter(courseDegree)})` , value : coursesOffered?.length},
        {keyName : "FunctionUp Rating",value:functionupRating}
    ]
    function handleClick(){
        push({
            pathname : '/blog/college-gallery',
            query : {slug,preview}
        })
    }
    return(
        <section className={styles.mainWrapper}>
            <h1>Summary</h1>
            <div className={styles.overviewTable}>
                {overViewTableData.map(({keyName,value},index)=>
                    <div className={styles.row} key={index}>
                        <p>{keyName}</p>
                        <p>{value}</p>
                    </div>
                )}
            </div>
            {campusPhotos?.length>0 && <h1 onClick={handleClick}>View Photos</h1>}
        </section>
    )
}