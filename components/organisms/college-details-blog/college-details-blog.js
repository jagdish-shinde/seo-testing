import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getPageDetails, getTopVisitiedColleges } from "../../../apis"
import { getCapitalFirstLetter, removePostFixFromSlug } from "../../../util/helper"
import { AboutSection, CoursesAndCampusSection, FooterSection, HeroSection, ModeOfAdmissionAndFeeSection, OverviewSection, PlacementsSection, RankingSection, ReachConnectivitySection, TrendingSearches } from "../../sections"
import { CollegeDetailSkeleton } from "./college-detail-skeleton"
import styles from './college-details.module.css'
import NotableAlumnis from "../../pages/notable-alumanis/notable-alumanis"
import { SLUG_PAGES } from "../../../util/constants"
import { CollegeGallery } from "../../pages/college-gallery"
import { currentSlugPageAtom } from "../../../util/recoil-states/college-ui-atoms"
import { useRecoilState } from "recoil"
import NotableAlumaniSection from "../../sections/notable-alumanis-section/notable-alumanis-section"
import WhatsappCommunityBtn from "../../atoms/whatsapp-community-btn/whatsapp-community-btn"

export function CollegeDetailsBlogComponent(){
    const [heroSectionData,setHeroSectionData] = useState({})
    const [overviewSectionData,setOverviewSectionData] = useState({})
    const [connectivityData,setConnectivityData] = useState({})
    const [ranking,setRanking] = useState("")
    const [coursesAndCampusData,setCoursesAndCampusData] = useState({})
    const [modeOfAdmission,setModeOfAdmission] = useState([])
    const [hostelFeeAndCourses,setHostelFeeAndCourses] = useState({})
    const [placementDataFor2022,setPlacementDataFor2022] = useState({})
    const [placementDataFor2023,setPlacementDataFor2023] = useState({})
    const [isLoading,setIsLoading] = useState(false)
    const [description,setDescription] = useState('')
    const {query,isReady,push} = useRouter()
    const [topVisitedColleges,setTopVisitedColleges] = useState([])
    const [currentPage, setCurrentPage] = useRecoilState(currentSlugPageAtom)
    let {slug,preview=false} = query || {}


    useEffect(()=>{
        if(!isReady) return
        if(!slug) {
            push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
            return
        }
        getDetails();
    },[isReady, slug])
    
    async function getCollegePageDetails(){
        const data = await getPageDetails({slug,preview})
        if(!data) {
            push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
            return
        }
        const {
            name='',
            logo='',
            desktopImage='',
            mobileImage='',
            city='',
            state='',
            establishedIn='',
            instituteType='',
            courseDegree='',
            functionupRating='',
            coursesOffered=[],
            campusPhotos=[],
            address='',
            nearestAirport='',
            nearestAirportDistance="",
            nearestRailway="",
            nearestRailwayDistance="",
            ranking='',
            facilities=[],
            totalAdmissions2022='',
            totalAdmissions2023='',
            modeOfAdmission=[],
            hostelFee='',
            averagePackage2022='NA',
            averagePackage2023='NA',
            highestPackage2022='NA',
            highestPackage2023='NA',
            lowestPackage2022='NA',
            lowestPackage2023="NA",
            placementPercentage2022='',
            placementPercentage2023='',
            placementExplanation2022='',
            placementExplanation2023='',
            topCompanies2022='',
            topCompanies2023='',
            description=''
        } = data || {}
        setHeroSectionData({name,logo,desktopImage,mobileImage})
        setOverviewSectionData({city,state,establishedIn,instituteType,courseDegree,functionupRating,coursesOffered,campusPhotos})
        setConnectivityData({address,nearestAirport,nearestAirportDistance,nearestRailway,nearestRailwayDistance})
        setRanking(ranking)
        setCoursesAndCampusData({coursesOffered,facilities,collegeName:name,totalAdmissions2022,totalAdmissions2023})
        setModeOfAdmission(modeOfAdmission)
        setHostelFeeAndCourses({hostelFee,coursesOffered})
        setPlacementDataFor2023({
            placementExplanation2023,topCompanies2023,placementPercentage2023,averagePackage2023,lowestPackage2023,highestPackage2023
        })
        setPlacementDataFor2022({averagePackage2022,lowestPackage2022,highestPackage2022,placementExplanation2022,topCompanies2022,placementPercentage2022})
        setDescription(description)
    }
    async function getDetails(){
        try{
            setIsLoading(true)
            slug = slug?.toLowerCase()?.trim()
            if(slug.includes(SLUG_PAGES.notableAlumni)){
                setCurrentPage(SLUG_PAGES.notableAlumni)
                setIsLoading(false)
                return  
            }
            if(slug.includes(SLUG_PAGES.photoGallery)){
                setCurrentPage(SLUG_PAGES.photoGallery)
                setIsLoading(false)
                return
            }
            setCurrentPage(SLUG_PAGES.college)
            await getCollegePageDetails();
            getTopVisitCollege();
            setIsLoading(false)
        }catch(error){
            console.log(error?.message)
            // setIsLoading(false)
            push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
        }
    }

    async function getTopVisitCollege(){
        try{
            const pageSlug = removePostFixFromSlug(slug, SLUG_PAGES.photoGallery) 
            const data = await getTopVisitiedColleges({slug: pageSlug, preview})
            if(data?.length){
                const topCollegeData = []
                data.forEach((collegeData)=>{
                    const {colleges=[],slug=''} = collegeData || {}
                    const {desktopImage='',name='',city='',state='',logo=''} = colleges[0] || {}
                    topCollegeData.push({desktopImage,name,city,state,slug,logo})
                })
                setTopVisitedColleges(topCollegeData)
            }
        }catch(error){
            console.log(error?.message)
        }
    }


    function isPlacementSectionVisible(){
        const {placementExplanation2023,placementPercentage2023,topCompanies2023} = placementDataFor2023 || {}
        const {placementExplanation2022,placementPercentage2022,topCompanies2022} = placementDataFor2022 || {}
        if(String(placementPercentage2022)?.length || 
            String(placementPercentage2023)?.length ||
                String(placementExplanation2023)?.length || 
                    String(topCompanies2023)?.length ||
                        String(placementExplanation2022)?.length || 
                            String(topCompanies2022)?.length) return true
        return false
    }

    if(isLoading){
        return (
            <CollegeDetailSkeleton/>
        )
    }
    if(currentPage === SLUG_PAGES.notableAlumni){
            return <NotableAlumnis />
    }
    if(currentPage === SLUG_PAGES.photoGallery){
            return <CollegeGallery/>
    }
    return(
        <main>
            <Head>
                <title>{`${getCapitalFirstLetter(heroSectionData?.name)}: Placements, Ranking, Courses, Alumni, Photos Admissions in 2024`}</title>
            </Head>
            <div className={`${styles.mainWrapper}`}>
                <HeroSection heroSectionData={heroSectionData} isPlacementSectionVisible = {isPlacementSectionVisible()}/>
                <OverviewSection data={overviewSectionData}/>
                <ReachConnectivitySection data={connectivityData}/>
                <RankingSection data={ranking}/>
                {topVisitedColleges?.length && <TrendingSearches data={topVisitedColleges}/>}
                <CoursesAndCampusSection data={coursesAndCampusData}/>
                <ModeOfAdmissionAndFeeSection modeOfAdmission={modeOfAdmission} hostelFeeAndCourses = {hostelFeeAndCourses} collegeName = {heroSectionData?.name}/>
                {isPlacementSectionVisible() && <PlacementsSection placementDataFor2022={placementDataFor2022} placementDataFor2023={placementDataFor2023}/>}
                <NotableAlumaniSection />
                {description && <AboutSection data={description}/>}
                <FooterSection/>
            </div>
            <WhatsappCommunityBtn pageTitle={`${heroSectionData?.name}`} collegeName={heroSectionData?.name}/>
        </main>
    )
}