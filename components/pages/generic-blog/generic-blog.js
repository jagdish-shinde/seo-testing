import Head from "next/head";
import { Header } from "../../molecules";
import { QAContentWithMedia } from "../../organisms";
import { FooterSection, TrendingSearches } from "../../sections";
import styles from './generic-blog.module.css'
import * as amplitude from '@amplitude/analytics-browser';
import HtmlParser from "react-html-parser";
import WhatsappCommunityBtn from "../../atoms/whatsapp-community-btn/whatsapp-community-btn";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useInView } from 'react-intersection-observer';


export function GenericBlogPage ({data, trendingSearches} ){
    const {isReady} = useRouter()
    const [ref, inView] = useInView()


    const {
        description = '',
        publishedAt = '',
        title = '',
        subSection = [],
        metaDescription = ''
    } = data || {};


    function handleTrendingSearchClick(link,index){
        amplitude.track('SEO_CLIKCED_ON_RECOMMENDATION', {
            pageTitle : `${title} - Generic Blog Page`,
            navigateToPage :  link,
            navigationPagePosition : index+1
        });
        setTimeout(()=>{ 
            window.open(link,'_blank')
        },500)
    }

    useEffect(()=>{
        if(!isReady) return
        amplitude.track('SEO_PAGE_VISIT', {
            pageTitle : `${title} - Generic Blog Page`,
        });
    },[isReady])

    return (
        <main>
            <Header
                customWrapperStyle ={inView ? styles.headerStyle : styles.boxShadow}
                pageTitle={`${title}`}
            />
            <Head>
                <meta name="description" content={metaDescription} />
                <title>{title}</title>
            </Head>

            <section className={`${styles.heroWrapper}`} ref={ref}>
                <h2 className={styles.heading}>{title}</h2>
                <h5 className={styles.publishedDate}>
                    Published on : {publishedAt} by CollegeShaala Team
                </h5>
            </section>
            
            {
                description && 
                <p className={styles.blogDescription}>
                    {HtmlParser(description)}
                </p>
            }
            {
                subSection?.map(data => (
                    <QAContentWithMedia 
                        data = {data}
                        key = {data?._id}
                    />
                ))
            }
            
            <TrendingSearches 
                data = {trendingSearches}
                handleRedirectToCollege = {handleTrendingSearchClick}
            />
            <WhatsappCommunityBtn 
                pageTitle={`${title} - Generic Blog Page`}
                containerStyle={styles.footerBtn}
            />
            <FooterSection />
        </main>
    )
}