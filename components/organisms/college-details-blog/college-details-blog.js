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
import { currentSlugPageAtom } from "../../../util/recoil-states/college-ui-atoms"
import { useRecoilState } from "recoil"
import NotableAlumaniSection from "../../sections/notable-alumanis-section/notable-alumanis-section"
import WhatsappCommunityBtn from "../../atoms/whatsapp-community-btn/whatsapp-community-btn"
import { useInView } from 'react-intersection-observer';
import { CollegeDegreeComponent } from "../college-degree/college-degree"
import * as amplitude from '@amplitude/analytics-browser';
import { CollegeGalleryComponent } from "../college-gallery/college-gallery"
import { GenericBlogPage } from "../../pages/generic-blog/generic-blog"

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
    const [isLoading,setIsLoading] = useState(true)
    const [description,setDescription] = useState('')
    const {query,isReady,push} = useRouter()
    const [topVisitedColleges,setTopVisitedColleges] = useState([])
    const [currentPage, setCurrentPage] = useRecoilState(currentSlugPageAtom)
    const [degreeData, setDegreeData] = useState({})
    const [alumniList, setAlumniList] = useState([])
    const [alumniPageData, setAlumniPageData] = useState({})
    const [collegeGalleryPageData, setCollegeGalleryPageData] = useState({})
    const [genericPageData, setGenericPageData] = useState({})
    const [ref,inView] = useInView()
    const [isMobileView, setIsMobileView] = useState(false)
    let {slug,preview=false} = query || {}

    useEffect(()=>{
        if(!isReady) return
        if(!slug) {
            push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
            return
        }
        getDetails();
    },[isReady, slug])
    
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


    async function getCollegePageDetails(){
        const data = await getPageDetails({slug,preview})
        if(!data) {
            push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
            return
        }
        let type = data?.type
        if(type == "college-gallery"){
            setCurrentPage(SLUG_PAGES.photoGallery)
            setCollegeGalleryPageData(data)
            setIsLoading(false)
            return
        }
        if(type == "college-alumni"){
            setCurrentPage(SLUG_PAGES.notableAlumni)
            setAlumniPageData(data)
            setIsLoading(false)
            return
        }
        if(type=="degree-description"){
            setCurrentPage(SLUG_PAGES.degree)
            setDegreeData(data)
            setIsLoading(false)
            return
        }
        if(type === 'generic-page'){
            setCurrentPage(SLUG_PAGES?.genericPage)
            setGenericPageData(data)
            setIsLoading(false)
            return
        }
        setCurrentPage(SLUG_PAGES.college)
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
            description='',
            alumniData=[]
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
        setAlumniList(alumniData)
    }
    async function getDetails(){
        try{
            slug = slug?.toLowerCase()?.trim()
            await getCollegePageDetails();
            getTopVisitCollege();
            setIsLoading(false)
        }catch(error){
            console.log(error?.message)
            push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
        }
    }

    async function getTopVisitCollege(){
        try{
            const data = await getTopVisitiedColleges({slug, preview})
            if(data?.length){
                setTopVisitedColleges(data)
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

    function handleTrendingSearchClick(link,index,name){
        amplitude.track('SEO_CLIKCED_ON_RECOMMENDATION', {
            pageTitle : heroSectionData?.name ,
            navigateToPage :  link,
            navigationPagePosition : index+1
        });
        setTimeout(()=>{ window.open(link,'_blank')},500)
    }

    if(isLoading){
        return (
            <CollegeDetailSkeleton/>
        )
    }
    if(currentPage === SLUG_PAGES.notableAlumni){
        return <NotableAlumnis data={alumniPageData}/>
    }
    if(currentPage === SLUG_PAGES.photoGallery){
        return <CollegeGalleryComponent data={collegeGalleryPageData}/>
    }
    if(currentPage === SLUG_PAGES.degree){
        return <CollegeDegreeComponent data={degreeData} trendingSearches = {topVisitedColleges}/>
    }
    if(currentPage === SLUG_PAGES?.genericPage){
        return (
            <GenericBlogPage 
                data = {genericPageData} 
                trendingSearches = {topVisitedColleges}
            />
        )
    }
    return(
        <main>
            <Head>
                <title>{`Is ${getCapitalFirstLetter(heroSectionData?.name)} Good`}</title>
                <meta name="description" content={`Discover all about ${heroSectionData?.name}: Admissions, programs, campus life, Fees, Placements record and more. Get all information and insights about Indian engineering colleges.`} />
            </Head>
            <div className={`${styles.mainWrapper}`}>
                <HeroSection heroSectionData={heroSectionData} isPlacementSectionVisible = {isPlacementSectionVisible()} inHeaderView={inView} intersectionRef={ref}/>
                {description && <AboutSection data={description} collegeName={heroSectionData?.name}/>}
                <OverviewSection data={overviewSectionData} isMobileView={isMobileView} collegeName={heroSectionData?.name}/>
                <ReachConnectivitySection data={connectivityData} collegeName={heroSectionData?.name}/>
                <RankingSection data={ranking} collegeName={heroSectionData?.name}/>
                {topVisitedColleges?.length && <TrendingSearches data={topVisitedColleges} handleRedirectToCollege={handleTrendingSearchClick} />}
                <CoursesAndCampusSection data={coursesAndCampusData} collegeName={heroSectionData?.name}/>
                <ModeOfAdmissionAndFeeSection modeOfAdmission={modeOfAdmission} hostelFeeAndCourses = {hostelFeeAndCourses} collegeName = {heroSectionData?.name}/>
                {isPlacementSectionVisible() && <PlacementsSection placementDataFor2022={placementDataFor2022} placementDataFor2023={placementDataFor2023} collegeName={heroSectionData?.name}/>}
                {alumniList?.length>0 && <NotableAlumaniSection alumniList={alumniList} isMobileView={isMobileView} collegeName = {heroSectionData?.name}/>}
                <FooterSection/>
            </div>
            <WhatsappCommunityBtn pageTitle={`${heroSectionData?.name}`} collegeName={heroSectionData?.name}/>
        </main>
    )
}