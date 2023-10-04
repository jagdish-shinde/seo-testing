import Image from "next/image"
import { bits, iit, thiru } from "../../../public"
import styles from "./trending-searches.module.css"

export function TrendingSearches(){
    
    const images = [
        {image : bits, collegeName : "BITS Pilani", location:"Pilani, Rajastan"},
        {image : iit, collegeName : "IIST Thiruvanathapuram", location:"Thiruvanathapuram"},
        {image : thiru, collegeName : "IIT Lucknow", location:"Lucknow, Uttarpradesh"}
    ]

    return(
        <section className={`${styles.mainWrapper}`}>
            <h1>Most Trending Searches</h1>
            <hr></hr>
            <div className={`section-padding ${styles.trendingImgWrapper}`}>
                {images.map(({image,collegeName,location},index)=>
                    <div className={styles.collegeImgAndNameWrapper} key={index}>
                        <div className={styles.image}>
                            <Image
                                src={image} 
                                width="100%"
                                height="100%"
                                objectFit="fill"
                                layout="fill"   
                            />
                        </div>
                        <h2>{collegeName}</h2>
                        <p>{location}</p>
                    </div>
            )}
            </div>
        </section>
    )
}