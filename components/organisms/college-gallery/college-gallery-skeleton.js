import styles from "./college-gallery-skeleton.module.css"
import { Skeleton } from "@mui/material";

export function CollegeGallerySkeleton(){
    return(
        <div className={`section-padding ${styles.mainWrapper}`}>
            <Skeleton 
                height={200} 
                className={styles.mobileImage}
                variant="rectangular" 
                sx={{borderRadius : '10px'}}
            />
            <Skeleton 
                height={400} 
                className={styles.desktopImage}
                variant="rectangular" 
                sx={{borderRadius : '10px'}}
            />
            <div className={styles.imgWrapper}>
                {Array(4).fill(1).map(
                    (img,index)=><Skeleton 
                    height={200} 
                    className={styles.smallImg}
                    variant="rectangular" 
                    sx={{borderRadius : '10px'}}
                    key={index}
                />
                )}
            </div>
            
        </div>
    )
}