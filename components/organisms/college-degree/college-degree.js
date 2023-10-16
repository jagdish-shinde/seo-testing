import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import HtmlParser from "react-html-parser"
import { degreeNavigationIcons, DEGREE_NAME_SUFFIX } from "../../../util/constants"
import { CommonDataTable, ContentNavbar, Header } from "../../molecules"
import { FooterSection, TrendingSearches } from "../../sections"
import styles from "./college-degree.module.css"
import * as amplitude from '@amplitude/analytics-browser';
import Head from "next/head"
import WhatsappCommunityBtn from "../../atoms/whatsapp-community-btn/whatsapp-community-btn"

export function CollegeDegreeComponent({data,trendingSearches=[]}){
    const [isDialogOpen,setIsDialogOpen] = useState(false)
    const [selectedValue,setSelectedValue] = useState('Quick Navigation')
    const {query,isReady} = useRouter()
    const {slug=''} = query || {}
    const {
        name = '',
        description ='',
        jobOpportunitiesCount = '',
        freshersAvgSalary = '',
        futureDemandByYears = '',
        salaryGrowthByFiveYears = '',
        examinationType = '',
        leadingHiringFirms = '',
        admissionCriteria ='',
        whoShouldStudy = ''
    } = data || {}


    useEffect(()=>{
        if(!isReady) return
        amplitude.track('SEO_PAGE_VISIT', {
            pageTitle : `${name} : ${DEGREE_NAME_SUFFIX} `,
            DegreeName : `${name} : ${DEGREE_NAME_SUFFIX} `
        });
    },[isReady])

    function handleScroll(path,keyVl="desktop",value=''){
        const targetSection = document.querySelector(path);
        amplitude.track('SEO_NAVIGATE_DEGREE_PAGE', {
            pageTitle : `${name} : ${DEGREE_NAME_SUFFIX} `,
            DegreeName : `${name} : ${DEGREE_NAME_SUFFIX} `,
            navigateTo : path.replace("#",""),
        });
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        if(keyVl=="mobile"){
            setSelectedValue(value)
            setIsDialogOpen(false)
        }
    }

    const futureScopeTableData = [
        {keyName : "No of jobs yearly" , value : String(jobOpportunitiesCount)},
        {keyName : "Avg Salary for Fresher", value : freshersAvgSalary},
        {keyName : "Next 10-15 years Demand", value : futureDemandByYears},
        {keyName : "Examination Type", value:examinationType}
    ]

    if (String(salaryGrowthByFiveYears).length > 0) {
        futureScopeTableData.push({ keyName: "Growth in 5 years", value: salaryGrowthByFiveYears });
    }
    
    const pageData =[
        {heading : `What is <span>${name}</span>?`, content : HtmlParser(description), id:'aboutDegree'},
        {heading :`Future Scope of <span>${name}</span>`, type:"table",id:'futureScope'   },
        {heading : `Top Recruiting Company`,content :leadingHiringFirms,id:'topRecruiter'},
        {heading :'Admission Criteria' ,content :HtmlParser(admissionCriteria),id:'eligibility'},
        {heading :'Who should pursue this?',content : HtmlParser(whoShouldStudy),id:'bestFit'}
    ]

    function handleTrendingSearchClick(link,index,trendingSearchName){
        amplitude.track('SEO_CLIKCED_ON_RECOMMENDATION', {
            pageTitle : `${name} : ${DEGREE_NAME_SUFFIX} `,
            navigateToPage :  link,
            navigationPagePosition : index+1
        });
        setTimeout(()=>{ window.open(`/blog/${slug}`,'_blank')},500)
    }

    return(
        <main>
            <Head>
                <title>{`${name} : ${DEGREE_NAME_SUFFIX} `}</title>
            </Head>
            <div className={styles.mainWrapper}>
                <Header customWrapperStyle={styles.header} degreeName={name} pageTitle={`${name} : ${DEGREE_NAME_SUFFIX} `}/>
                <div className={`section-padding ${styles.heroSection}`}>
                    <h1 className={styles.degreeDetails}><span>{name}</span> : {DEGREE_NAME_SUFFIX} </h1>
                    <ContentNavbar
                        isDialogOpen = {isDialogOpen}
                        setIsDialogOpen = {setIsDialogOpen}
                        selectedValue = {selectedValue}
                        data ={degreeNavigationIcons}
                        handleClick = {handleScroll}
                    />
                </div>
                {pageData.map(({heading,content,type='data',id},index)=>
                    <div className={styles.sectionWrapper} key={index} id={id}>
                        <p className={styles.containerHeading}>{HtmlParser(heading)}</p>
                        <hr></hr>
                        {type =='table' && 
                            <div className={`section-padding ${styles.tableWrapper}`}>
                                <CommonDataTable
                                    data={futureScopeTableData}
                                    customWrapperStyle={styles.table}
                                    customRowStyle = {styles.rowStyle}
                                />
                            </div>
                        }
                        {type == "data" && 
                            <p className={`section-padding ${styles.containerInnerInfoText}`}>{content}</p>
                        }
                    </div>
                )}
            </div>
            {trendingSearches?.length>0 && <TrendingSearches data={trendingSearches} handleRedirectToCollege={handleTrendingSearchClick}/>}
            <FooterSection/>
            <WhatsappCommunityBtn pageTitle={`${name} : ${DEGREE_NAME_SUFFIX}`} degreeName={name}/>
        </main>
    )
}