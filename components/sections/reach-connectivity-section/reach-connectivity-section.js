import Image from "next/image";
import { addressVector, aeroplane, railway } from "../../../public";
import { connectivities } from "../../../util/constants";
import styles from "./reach-connectivity-section.module.css";

export function ReachConnectivitySection({data}){
    const {
        address='',
        nearestAirport='',
        nearestAirportDistance="",
        nearestRailway="",
        nearestRailwayDistance=""
    } = data || {}

    const connectivities = [
        {
            icon : addressVector,
            heading : "Address",
            value : address,
        },
        {
            icon : railway,
            heading : "Nearest Railway Station",
            value :nearestRailway,
            distanceKey : `(${nearestRailwayDistance})`
        },
        {
            icon : aeroplane,
            heading :"Nearest Airport",
            value :nearestAirport,
            distanceKey : `(${nearestAirportDistance})`
        }
    ]
    return(
        <section id="connectivity">
            <h1 className={styles.heading}>Connectivity Instructions</h1>
            <hr className={styles.line}></hr>
            <div className={styles.conectivityWrapper}>
                {connectivities.map(({icon='',heading='',value='',distanceKey=''},index)=>
                    <div className={styles.connectivityBox} key={index}>
                        <div className={styles.connectivityDetails}>
                            <div className={styles.logo}>
                                <Image
                                    src={icon}
                                    width="100%"
                                    height="100%"
                                    layout="fill"
                                    objectFit="fill"
                                />
                            </div>
                            <div className={styles.textBlock}>
                                <p>{`${heading} : ${value}`}<span>{distanceKey}</span></p>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </section>
    )
}