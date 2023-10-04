import HtmlParser from "react-html-parser"
import styles from "./placement-card.module.css"
export function PlacementCard({data,year=''}){
    const {
        placementPercent="",
        lowestPackage = 'NA',
        averagePackage = 'NA',
        highestPackage = 'NA',
        topRecruiters = ``,
        placementExplanation =""
    } = data || {}

    const packages = [
        {heading : "Lowest", packageValue : lowestPackage},
        {heading : "Average", packageValue : averagePackage},
        {heading : "Highest", packageValue : highestPackage}
    ]
    return(
        <div className={styles.mainWrapper}>
            <h1>Placement Stats of {year}</h1>
            <hr className={styles.line}></hr>
            <div className={styles.wrapper}>
                {placementExplanation && <h2>{HtmlParser(placementExplanation)}</h2>}
                {placementPercent && <h3>Placement% : <span>{placementPercent}</span></h3>}
                <div className={styles.packageWrapper}>
                    {packages.map(({heading,packageValue},index)=>
                        <div className={styles.packageText} key={index}>
                            <p>{heading} <span>Package</span></p>
                            <p>{packageValue!=="NA" ? `${String(packageValue).toUpperCase()}` : packageValue}</p>
                        </div>
                    )}
                </div>
                {topRecruiters && <div className={styles.topRecruiters}>
                    <p>Top recruiters :</p>
                    <p>{topRecruiters}</p>
                </div>}
            </div>
            
        </div>
    )
}