import { PlacementCard } from '../../molecules'
import styles from './placements-section.module.css'
export function PlacementsSection({
    placementDataFor2022,placementDataFor2023, collegeName
}){
    const {
        averagePackage2022 = 'NA',
        lowestPackage2022 = 'NA',
        highestPackage2022 = 'NA',
        placementExplanation2022='',
        topCompanies2022='',
        placementPercentage2022=''
    } = placementDataFor2022 || {}

    const {
        placementExplanation2023 = '',
        topCompanies2023 ='',
        placementPercentage2023 ='',
        averagePackage2023 = 'NA',
        lowestPackage2023 = 'NA',
        highestPackage2023 ='NA'
    } = placementDataFor2023 || {} 

    const placemntData23 = {
        placementPercent : placementPercentage2023,
        lowestPackage : lowestPackage2023,
        averagePackage : averagePackage2023,
        highestPackage : highestPackage2023,
        topRecruiters : topCompanies2023,
        placementExplanation  : placementExplanation2023
    } 

    const placementData22 = {
        placementPercent : placementPercentage2022,
        lowestPackage : lowestPackage2022,
        averagePackage : averagePackage2022,
        highestPackage : highestPackage2022,
        topRecruiters : topCompanies2022,
        placementExplanation  : placementExplanation2022
    }

    function isCardVisible(year){
        if(year == "2022"){
            if(String(placementExplanation2022)?.length || String(placementPercentage2022)?.length || String(topCompanies2022)?.length){
                return true
            }
            return false
        }
        if(year == "2023"){
            if(String(placementExplanation2023)?.length || String(placementPercentage2023)?.length || String(topCompanies2023)?.length){
                return true
            }
            return false
        }
    }

    return(
        <section className={`${styles.mainWrapper}`} id="placement">
            <h2>What is the placement record of {collegeName}?</h2>
            <hr></hr>
            <div className={`section-padding ${styles.placemntCardWraper}`}>
                {isCardVisible("2023") && <PlacementCard 
                    data = {placemntData23}
                    year = "2023"
                />}
                {isCardVisible("2022") && <PlacementCard 
                    data = {placementData22}
                    year = "2022"
                />}
            </div>
        </section>
    )
}