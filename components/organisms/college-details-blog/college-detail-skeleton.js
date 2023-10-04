import styles from "./college-detail-skeleton.module.css"
import { Skeleton } from "@mui/material";

export function CollegeDetailSkeleton(){

    const skeletonsData = [
        {height:150, className : styles.logo},
        {height:60, className : styles.collegeName},
        {height:30, className : styles.collegeName},
        {height:50, className : styles.dropdown},
        {height:50, className : styles.overview},
        {height:200, className : styles.table},
        
    ]
    return(
        <div className={styles.mainWrapper}>
           <Skeleton 
            height={60} 
            width={'100%'} 
            variant="rectangular" 
            sx={{borderRadius : '10px'}}

        />
        <div className={styles.logoWrapper}>
            {skeletonsData.map(({height,className},index)=>
                <Skeleton 
                    height={height} 
                    className={className} 
                    variant="rectangular" 
                    sx={{borderRadius : '10px'}}
                    key ={index}
                /> 
           )}
        </div>
        </div>
    )
}