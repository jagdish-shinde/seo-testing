import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { getPageDetails } from "../../../apis";
import { blurImg, flask, leftNavigate, rightNavigate } from "../../../public";
import { Header } from "../../molecules";
import { CollegeGallerySkeleton } from "./college-gallery-skeleton";
import styles from "./college-gallery.module.css"
import * as amplitude from '@amplitude/analytics-browser';
import Head from "next/head";

export function CollegeGalleryComponent() {
    const {query,push,isReady} = useRouter()
    const [currentIdx,setCurrentIdx] = useState(0)
    const [isLoading,setIsLoading] = useState(false)  
    const [images,setImages]   = useState([])
    const {slug,preview=false} = query || {}
    const [collegeName,setcollegeName] = useState('')
    const [imageDomensions, setImageDomensions] = useState({width: 0, height: 0})

    async function getCollegePageDetails(){
        try{
            setIsLoading(true)
            const data = await getPageDetails({slug,preview})
            if(!data) {
                push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
                return
            }
            const {campusPhotos=[],name=''} = data || {}
            amplitude.track('SEO_CAMPUS_PHOTO_VIEW', {
                pageTitle : name,
                collegeName : name
              });
            setImages(campusPhotos)
            setIsLoading(false)
            setcollegeName(name)
        }catch(error){
            console.log(error?.message)
            push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
        }
    }

    useEffect(()=>{
        if(!isReady) return
        if(!slug) {
            push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
            return
        }
        getCollegePageDetails();
    },[isReady])


  useEffect(() => {
    function handleResize() {
      const windowWidth = window?.innerWidth  
      const padding =   window?.innerWidth < 1024 ? 20 : 126
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
            if(currentIdx < images?.length-1 ){
                setCurrentIdx(currentIdx+1)
            }else{
                setCurrentIdx(0)
            }
        }
        if(type == "left"){
            if(currentIdx == 0 ){
                setCurrentIdx(images?.length -1)
            }else{
                setCurrentIdx(currentIdx-1)
            }
        }
    }

    function handleRedirect(){
        push({
            pathname:`/blog/${slug}`,
            query:{preview}
        })
    }
    return(
        <main>
            <Header
               customWrapperStyle={styles.header} 
               customLogoStyle ={styles.logo}
            />
            <Head>
                <title>{`${collegeName}-Campus Photos`}</title>
            </Head>
            {isLoading ? <CollegeGallerySkeleton/> :
                <div className={`section-padding ${styles.mainWrapper}`}>
                    <p className={styles.backNavigate} onClick={()=>handleRedirect()}>&larr;BACK</p>
                    <div className={styles.mainImage} 
                        style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${images[currentIdx]})`}}
                        >
                    </div>
                    {images?.length>1 && <div className={styles.rightbtn} onClick={()=>handleClick("right")}>
                        <Image 
                            src={rightNavigate}
                            width="100%"
                            height="100%"
                            objectFit="fill"
                            layout="fill"
                        />
                    </div>}
                    {images?.length>1 && <div className={styles.leftBtn} onClick={()=>handleClick("left")}>
                        <Image 
                            src={leftNavigate}
                            width="100%"
                            height="100%"
                            objectFit="fill"
                            layout="fill"
                        />
                    </div>}
                    {images?.length>1 && <div className={styles.btnsWrapper}>
                        {images.map((dot,index)=><div className={styles.dot} style={{backgroundColor : index== currentIdx ? "blue" : "rgb(126, 125, 125)"}} key={index}></div>)}
                    </div>}
                        {images?.length>1 &&  <div className={styles.imagesContainer}>
                            {images.map((image,index)=>
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
            }
        </main>
    )
}