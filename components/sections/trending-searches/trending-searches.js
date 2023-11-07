import Image from "next/image"
import {blurImg, childWithBook, degreeTrendSearch } from "../../../public"
import styles from "./trending-searches.module.css"

export function TrendingSearches({
    data=[],
    handleRedirectToCollege = ()=>{}
}){

    const genericImages = [degreeTrendSearch,childWithBook]
    const altForTrendingSearchImages = ["person looking for job", "children with book"]
    let trendingSearchAlt = 'person looking for job'
    function getRandomIndex(){
        const index = Math.floor(Math.random() * genericImages.length);
        trendingSearchAlt = altForTrendingSearchImages[index]
        return index
    }

    function isDegreeOrGeneric(type){
        if(type == "degree-description" || type == "generic-page" || type== "programmatic") return true
        return false
    }

    return(
        <section className={`${styles.mainWrapper}`}>
            <h2>Most Trending Searches</h2>
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
                                    alt={name}
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
                                        alt={`${name} logo`}
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
                                        alt={trendingSearchAlt}
                                    />
                                </div> } 
                        <h2>{name}</h2>
                    </div>
            )}
            </div>
        </section>
    )
}