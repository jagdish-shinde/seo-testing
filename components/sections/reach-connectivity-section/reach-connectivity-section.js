import Image from "next/image";
import { addressVector, aeroplane, railway } from "../../../public";
import { connectivities } from "../../../util/constants";
import styles from "./reach-connectivity-section.module.css";

export function ReachConnectivitySection({data, collegeName}){
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
            alt : 'Address icon'
        },
        {
            icon : railway,
            heading : "Nearest Railway Station",
            value :nearestRailway,
            distanceKey : `(${nearestRailwayDistance})`,
            alt : 'railway icon'
        },
        {
            icon : aeroplane,
            heading :"Nearest Airport",
            value :nearestAirport,
            distanceKey : `(${nearestAirportDistance})`,
            alt : 'airport icon'
        }
    ]
    return(
        <section id="connectivity">
            <h2 className={styles.heading}>How to visit {collegeName} and address</h2>
            <hr className={styles.line}></hr>
            <div className={styles.conectivityWrapper}>
                {connectivities.map(({icon='',heading='',value='',distanceKey='', alt},index)=>
                    <div className={styles.connectivityBox} key={index}>
                        <div className={styles.connectivityDetails}>
                            <div className={styles.logo}>
                                <Image
                                    src={icon}
                                    width="100%"
                                    height="100%"
                                    layout="fill"
                                    objectFit="fill"
                                    alt={alt}
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