import Head from "next/head";
import { Header } from "../../molecules";
import { QAContentWithMedia } from "../../organisms";
import { FooterSection, TrendingSearches } from "../../sections";
import styles from './generic-blog.module.css'
import * as amplitude from '@amplitude/analytics-browser';
import HtmlParser from "react-html-parser";
import WhatsappCommunityBtn from "../../atoms/whatsapp-community-btn/whatsapp-community-btn";

export function GenericBlogPage ({data, trendingSearches} ){

    const {
        description = '',
        publishedAt = '',
        title = '',
        subSection = [],
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

    return (
        <main>
            <Header
                customWrapperStyle ={styles.headerStyle}
                pageTitle={`${title} - Generic Blog Page`}
            />
            <Head>
                <title>{`${title}: Generic Blog Page`}</title>
            </Head>

            <section className={`${styles.heroWrapper}`}>
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
            />
            <FooterSection/>
        </main>
    )
}