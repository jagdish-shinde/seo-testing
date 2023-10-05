import Image from "next/image"
import {blurImg } from "../../../public"
import styles from "./trending-searches.module.css"
import * as amplitude from '@amplitude/analytics-browser';

export function TrendingSearches({data}){
    function handleRedirectToCollege(slug,collegeName,index){
        amplitude.track('SEO_CLIKCED_ON_RECOMMENDATION', {
            pageTitle : collegeName,
            collegeName : collegeName,
            navigateToPage :  `/blog/${slug}`,
            navigationPagePosition : index+1
        });
        setTimeout(()=>{ window.open(`/blog/${slug}`,'_blank')},500)
    }
    return(
        <section className={`${styles.mainWrapper}`}>
            <h1>Most Trending Searches</h1>
            <hr></hr>
            <div className={`section-padding ${styles.trendingImgWrapper}`}>
                {data.map(({desktopImage='',name,city,state,slug,logo},index)=>
                    <div className={styles.collegeImgAndNameWrapper} key={index} onClick={()=>handleRedirectToCollege(slug,name,index)}>
                        {desktopImage ? 
                            <div className={styles.image}>
                                <Image
                                    src={desktopImage} 
                                    width="100%"
                                    height="100%"
                                    objectFit="fill"
                                    layout="fill"   
                                    placeholder="blur"
                                    blurDataURL={blurImg}
                                />
                            </div> : 
                            <div className={styles.logoImgWrapper}>
                                <div className={styles.logo}>
                                    <Image
                                        src={logo} 
                                        width="100%"
                                        height="100%"
                                        objectFit="fill"
                                        layout="fill"   
                                        placeholder="blur"
                                        blurDataURL={blurImg}
                                    />
                                </div>
                            </div>
                        }
                        <h2>{name}</h2>
                        <p>{`${city}, ${state}`}</p>
                    </div>
            )}
            </div>
        </section>
    )
}