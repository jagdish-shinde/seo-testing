import { useRouter } from "next/router"
import { degrees } from "../../../util/constants"
import { getCapitalFirstLetter } from "../../../util/helper"
import styles from "./overview-section.module.css"
import { removeMathchingSubString } from "../../../util/helper";
import { CommonDataTable } from "../../molecules"

export function OverviewSection({data,isMobileView=false, collegeName=''}){
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
        {keyName : `Courses (${getCapitalFirstLetter(degrees[courseDegree])})` , value : coursesOffered?.length},
        {keyName : "FunctionUp Rating",value:functionupRating}
    ]
    function handleClick(){
        let pageSlug = collegeName?.trim()?.toLowerCase().replaceAll(' ', '-')

        if(!isMobileView){
            window.open(`/blog/${pageSlug}-campus-photos`,'_blank')
        }else{
            push({
                pathname : `/${pageSlug}-campus-photos`
            })
        }
    }

    return(
        <section className={styles.mainWrapper}>
            <h1>Summary</h1>
            <CommonDataTable
                data={overViewTableData}
                customWrapperStyle = {styles.tableWrapper}
            />
            {campusPhotos?.length>0 && <h1 onClick={handleClick}>View Photos</h1>}
        </section>
    )
}