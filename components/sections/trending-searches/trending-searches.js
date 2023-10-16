import Image from "next/image"
import {blurImg, childWithBook, degreeTrendSearch } from "../../../public"
import styles from "./trending-searches.module.css"
import * as amplitude from '@amplitude/analytics-browser';

export function TrendingSearches({
    data=[],
    handleRedirectToCollege = ()=>{}
}){

    const genericImages = [degreeTrendSearch,childWithBook]
    
    function getRandomIndex(){
        return Math.floor(Math.random() * genericImages.length);
    }

    function isDegreeOrGeneric(type){
        if(type == "degree-description" || type == "generic-page") return true
        return false
    }

    return(
        <section className={`${styles.mainWrapper}`}>
            <h1>Most Trending Searches</h1>
            <hr></hr>
            <div className={`section-padding ${styles.trendingImgWrapper}`}>
                {data.map(({link='',image,imageType='',name,type},index)=>
                    <div className={styles.collegeImgAndNameWrapper} key={index} onClick={()=>handleRedirectToCollege(link,index,name)}>
                        {imageType == "desktop" &&  
                            <div className={styles.image}>
                                <Image
                                    src={image} 
                                    width="100%"
                                    height="100%"
                                    objectFit="fill"
                                    layout="fill"   
                                    placeholder="blur"
                                    blurDataURL={blurImg}
                                />
                            </div> } 
                            {imageType == "logo" && <div className={styles.logoImgWrapper}>
                                <div className={styles.logo}>
                                    <Image
                                        src={image} 
                                        width="100%"
                                        height="100%"
                                        objectFit="fill"
                                        layout="fill"   
                                        placeholder="blur"
                                        blurDataURL={blurImg}
                                    />
                                </div>
                            </div>}
                            { isDegreeOrGeneric(type) &&  
                                <div className={styles.image}>
                                    <Image
                                        src={genericImages[getRandomIndex()]} 
                                        width="100%"
                                        height="100%"
                                        objectFit="fill"
                                        layout="fill"   
                                        placeholder="blur"
                                        blurDataURL={blurImg}
                                    />
                                </div> } 
                        <h2>{name}</h2>
                    </div>
            )}
            </div>
        </section>
    )
}