import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { getPageDetails } from "../../../apis";
import { blurImg, flask, leftNavigate, rightNavigate } from "../../../public";
import { Header } from "../../molecules";
import { CollegeGallerySkeleton } from "./college-gallery-skeleton";
import styles from "./college-gallery.module.css"
import * as amplitude from '@amplitude/analytics-browser';
import Head from "next/head";
import { SLUG_PAGES } from "../../../util/constants";
import { removePostFixFromSlug } from "../../../util/helper";
import WhatsappCommunityBtn from "../../atoms/whatsapp-community-btn/whatsapp-community-btn";
import { FooterSection } from "../../sections";
import BackNavigationButton from "../../atoms/back-navigation-button/back-navigation-button";

export function CollegeGalleryComponent({data={}}) {
    const {back,isReady} = useRouter()
    const [currentIdx,setCurrentIdx] = useState(0)
    const [imageDomensions, setImageDomensions] = useState({width: 0, height: 0})
    const {campusPhotos=[],name='', logo} = data || {}
    const [isMobileView,setIsMobileView] = useState(false)

    useEffect(()=>{
        if(!isReady) return
        amplitude.track('SEO_CAMPUS_PHOTO_VIEW', {
            pageTitle : `${name}: Photo Gallery`,
            collegeName : name
        });
    },[isReady])

  useEffect(() => {
    function handleResize() {
      const windowWidth = window?.innerWidth  
      const padding =   window?.innerWidth < 1024 ? 20 : 126
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      setImageDomensions({
        width : (windowWidth - (2 * padding))/2,
        height : ((windowWidth - (2 * padding))/2)/2
      })
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    function handleClick(type){
        if(type == "right"){
            if(currentIdx < campusPhotos?.length-1 ){
                setCurrentIdx(currentIdx+1)
            }else{
                setCurrentIdx(0)
            }
        }
        if(type == "left"){
            if(currentIdx == 0 ){
                setCurrentIdx(campusPhotos?.length -1)
            }else{
                setCurrentIdx(currentIdx-1)
            }
        }
    }

    return(
        <Fragment>
        <main>
            <Header
               customWrapperStyle={styles.header} 
               customLogoStyle ={styles.logo}
               pageTitle={`${name}: Photo Gallery`}
               collegeName= { name}
            />
            <Head>
                <title>{`${name}: Photo Gallery`}</title>
            </Head>

            <div className={`section-padding ${styles.mainWrapper}`}>
                {isMobileView && <BackNavigationButton/>}
                <div className={styles.collegeDetailsConatiner} style={{marginTop : isMobileView ? "" : "1rem"}}>
                    <div className={styles.collegeWrapper}>
                        <picture className={styles.collegeLogo}>
                            <Image 
                            src={logo || ''}
                            width={"100%"}
                            height={"100%"}
                            />
                        </picture>
                        <h1 className={styles.collegeName}>
                        {`${name}: Photo Gallery`}
                        </h1>
                    </div>
                </div>
                <div className={styles.mainImage} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${campusPhotos[currentIdx]})`}}>
                    <div className={styles.navigateBtnsWrapper}>
                        {campusPhotos?.length>1 && <div className={styles.rightbtn} onClick={()=>handleClick("right")}>
                            <Image 
                                src={rightNavigate}
                                width="100%"
                                height="100%"
                                objectFit="fill"
                                layout="fill"
                            />
                        </div>}
                        {campusPhotos?.length>1 && <div className={styles.leftBtn} onClick={()=>handleClick("left")}>
                            <Image 
                                src={leftNavigate}
                                width="100%"
                                height="100%"
                                objectFit="fill"
                                layout="fill"
                            />
                        </div>}
                    </div>
                    
                </div>
                
                {campusPhotos?.length>1 && <div className={styles.btnsWrapper}>
                    {campusPhotos.map((dot,index)=><div className={styles.dot} style={{backgroundColor : index== currentIdx ? "blue" : "rgb(126, 125, 125)"}} key={index}></div>)}
                </div>}
                    {campusPhotos?.length>1 &&  <div className={styles.imagesContainer}>
                        {campusPhotos.map((image,index)=>
                            <div className={styles.image} key={index} style={{width:imageDomensions?.width,height:imageDomensions?.height}}>
                                <Image 
                                    src={image}
                                    width="100%"
                                    height="100%"
                                    objectFit="fill"
                                    layout="fill"
                                    placeholder='blur'
                                    blurDataURL={blurImg}
                                />
                            </div>
                        )}
                    </div>}
                
                
            </div>
            
        <FooterSection />
        </main>
        <WhatsappCommunityBtn pageTitle={`${name}: Photo Gallery`} collegeName={name}/>
        </Fragment>
    )
}