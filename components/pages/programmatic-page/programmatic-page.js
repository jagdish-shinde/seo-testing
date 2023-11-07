import { useEffect, useState } from 'react';
import { CommonDataTable, Header, VideoPlayer } from '../../molecules'
import { CoursesAndCampusSection, FooterSection, ModeOfAdmissionAndFeeSection, OverviewSection, PlacementsSection, RankingSection, ReachConnectivitySection, TrendingSearches } from '../../sections'
import styles from './programmatic-page.module.css'
import WhatsappCommunityBtn from '../../atoms/whatsapp-community-btn/whatsapp-community-btn';
import * as amplitude from '@amplitude/analytics-browser';
import { QAContentWithMedia } from '../../organisms';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useInView } from 'react-intersection-observer';

export function ProgrammaticPage({
    data = {},
    trendingSearches=[]
}){
    const [isMobileView,setIsMobileView] = useState(false)
    const [ref,inView] = useInView()
    const {isReady} = useRouter()
    const {
        pageTitle='',
        pageDescription='',
        subSections=[],
        createdAt=''
    } = data || {}

    useEffect(() => {
        function handleResize() {
          const isMobile = window.innerWidth <= 768;
          setIsMobileView(isMobile);
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      useEffect(()=>{
        if(!isReady) return
        amplitude.track('SEO_PAGE_VISIT', {
            pageTitle : pageTitle,
        });
      },[isReady])

    function getComponentData(data,key){
        const {
            modeOfAdmission=[],
            hostelFee='',
            coursesOffered=[],
            name,
            topCompanies2022='',
            lowestPackage2022='',
            averagePackage2022='',
            highestPackage2022='',
            placementPercentage2022='',
            placementExplanation2022='',
            topCompanies2023='',
            lowestPackage2023='',
            averagePackage2023='',
            highestPackage2023='',
            placementPercentage2023='',
            placementExplanation2023='',
            totalAdmissions2022='',
            totalAdmissions2023='',
            facilities=[],
            title='',
            description='',
            media={},
            city = '',
            state = '',
            establishedIn ='',
            instituteType = '',
            courseDegree ='',
            functionupRating ='',
            campusPhotos=[],
            ranking=''
        }= data || {}

        if(key == "hostelFeeAndCourses"){
            return {
                coursesOffered : coursesOffered!=="NA" ? coursesOffered : [],
                hostelFee:hostelFee!=="NA" ? hostelFee : ""
            }
        }
        if(key == "ranking"){
            return ranking!=="NA" ? ranking : ""
        }
        if(key == "placementData2022"){
            return {
                topCompanies2022 : topCompanies2022!== "NA" ? topCompanies2022 : "",
                lowestPackage2022 : lowestPackage2022!== "NA" ? lowestPackage2022 : "",
                averagePackage2022 : averagePackage2022!== "NA" ? averagePackage2022 : "",
                highestPackage2022 : highestPackage2022!=="NA" ? highestPackage2022 : "",
                placementPercentage2022 : placementPercentage2022!=="NA" ? placementPercentage2022 : "",
                placementExplanation2022 : placementExplanation2022!=="NA" ? placementExplanation2022 : ""
            }
        }
        if(key == "placementData2023"){
            return {
                topCompanies2023 : topCompanies2023!=="NA" ? topCompanies2023 : "",
                lowestPackage2023 : lowestPackage2023!=="NA" ? lowestPackage2023 : "",
                averagePackage2023 : averagePackage2023!=="NA" ? averagePackage2023 : "",
                highestPackage2023 : highestPackage2023!=="NA" ? highestPackage2023 :"",
                placementPercentage2023 : placementPercentage2023!=="NA" ? placementPercentage2023 : "",
                placementExplanation2023 : placementExplanation2023!=="NA" ? placementExplanation2023 : ""
            }
        }
        if(key == "courseAndCampus"){
            return {
                totalAdmissions2022 : totalAdmissions2022!=="NA" ? totalAdmissions2022 : "",
                totalAdmissions2023 : totalAdmissions2023!=="NA" ? totalAdmissions2023 : "",
                facilities : facilities!=="NA" ? facilities : [], 
                collegeName : name,
                coursesOffered : coursesOffered!=="NA" ? coursesOffered : []
            }
        }
        if(key == "customComponent"){
            return{
                title,
                description,
                ...(Object.keys(media).length && {media})
            }
        }
        if(key == "overview"){
            return {
                city : city!=="NA" ? city : "",
                state : state!=="NA" ? state : "",
                establishedIn : establishedIn!=="NA" ? establishedIn : "",
                instituteType : instituteType !== "NA" ? instituteType : "",
                courseDegree : courseDegree!=="NA" ? courseDegree : "",
                functionupRating : functionupRating!== "NA" ? functionupRating : "",
                campusPhotos : campusPhotos!=="NA" ?  campusPhotos : [],
                coursesOffered : coursesOffered !== "NA" ?  coursesOffered : []
            }
        }
    }

    function createTableData(table=[]){
        table = table.sort((a,b)=>a?.rowNumber - b?.rowNumber)
        const tableData = []
        table.forEach(row=>{
            tableData.push({
                keyName : row.rowKey,
                value : row.rowValue
            })
        })
        return tableData
    }

    function isPlacementSectionVisible(data){
        const {
            placementExplanation2023,placementPercentage2023,topCompanies2023,
            placementExplanation2022,placementPercentage2022,topCompanies2022
        } = data || {}
        if((String(placementPercentage2022)?.length && placementPercentage2022!=="NA" ) || 
            (String(placementPercentage2023)?.length && placementPercentage2023!=="NA")||
                (String(placementExplanation2023)?.length && placementExplanation2023!=="NA") || 
                    (String(topCompanies2023)?.length && topCompanies2023!=="NA") ||
                        (String(placementExplanation2022)?.length && placementExplanation2022!=="NA") || 
                            (String(topCompanies2022)?.length) && topCompanies2022!=="NA") return true
        return false
    }


    function handleTrendingSearchClick(link,index,name){
        amplitude.track('SEO_CLIKCED_ON_RECOMMENDATION', {
            pageTitle : pageTitle ,
            navigateToPage :  link,
            navigationPagePosition : index+1
        });
        setTimeout(()=>{ window.open(link,'_blank')},500)
    }

    

    return (
        <main>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Header
                customWrapperStyle={!inView ? styles.boxShadowHeader :styles.headerStyle}
                pageTitle={pageTitle}
            />
            <div className={styles.heroWrapper} ref={ref}>
                <h2 className={styles.heading}>{pageTitle}</h2>
                <h5 className={styles.publishedDate}>
                    Published on : {createdAt} by CollegeShaala Team
                </h5>
            </div>
            <div className={`section-padding`}>
                <h3 className={styles.pageDescription}>{pageDescription}</h3>
            </div>

            {subSections?.length>0 && 
                subSections.map(({type='',component='',componentData={},title={},description='',mediaType='',mediaLink='',table=[]},index)=>
                    <div key={index}>
                        {
                            type == "reusable" && component == "overview" &&
                            <div>
                                <OverviewSection 
                                    data={getComponentData(componentData,"overview")} 
                                    isMobileView={isMobileView} 
                                    collegeName={componentData?.name || ""}
                                />
                            </div>
                        }
                        {
                           type == "reusable" &&  component == "connectivity-instructions" && 
                           <div className={styles.reusableComponentWrapper}>
                                <ReachConnectivitySection
                                  data={componentData}
                                  collegeName = {componentData?.name || ""}
                                />
                           </div>
                        }
                        {
                            type == "reusable" && component == "courses-and-campus" && 
                            <div className={styles.reusableComponentWrapper}>
                                <CoursesAndCampusSection
                                    data={getComponentData(componentData,"courseAndCampus")}
                                    collegeName={componentData?.name || ""}
                                />
                            </div>
                        }
                        {
                            type == "reusable" && component == "placement-stats" && isPlacementSectionVisible(componentData) &&
                                <div>
                                    <PlacementsSection
                                        placementDataFor2022={getComponentData(componentData,"placementData2022")}
                                        placementDataFor2023={getComponentData(componentData,"placementData2023")}
                                        collegeName = {componentData?.name || ""}
                                    />
                                </div>
                        }
                        {
                            type == "reusable" && component == "ranking" && 
                            <div >
                                <RankingSection data={getComponentData(componentData,"ranking")} collegeName = {componentData?.name || ""}/>
                            </div>
                        }
                        {
                            type == "reusable" && component == "fee-structure" && 
                            <div className={styles.reusableComponentWrapper}>
                                <ModeOfAdmissionAndFeeSection
                                    hostelFeeAndCourses={getComponentData(componentData,"hostelFeeAndCourses")}
                                    collegeName={componentData?.name || ""}
                                    modeOfAdmission = {componentData?.modeOfAdmission !== "NA" ? componentData?.modeOfAdmission || [] : []}
                            />
                            </div>
                        }
                        {
                            type == "custom" && 
                            <>
                                <hr className={styles.horizontal}></hr>
                                <QAContentWithMedia
                                    data={getComponentData({
                                        title : title?.text || "",
                                        description : description?.text || "",
                                        ...(mediaType && mediaLink && {media : {type : mediaType,link: mediaLink}})
                                    },"customComponent")}
                                    customTitleStyle= {styles.customTitle}   
                                    customDesStyle = {styles.customTitle}                                 
                                />
                            {
                                table.length>0 && 
                                <div className={styles.tableWrapper}>
                                    <CommonDataTable 
                                        data={createTableData(table)}
                                        customWrapperStyle ={styles.customTableStyle}
                                        customRowStyle={styles.rowStyle}
                                    />
                                 </div>
                            }
                            </>
                        }
                    </div>
                )
                
            }
            <div className={styles.reusableComponentWrapper}>
                <TrendingSearches
                    data={trendingSearches}
                    handleRedirectToCollege={handleTrendingSearchClick}
                />
            </div>
            
            <WhatsappCommunityBtn pageTitle={pageTitle}/>
            <FooterSection/>
        </main>
    )
}