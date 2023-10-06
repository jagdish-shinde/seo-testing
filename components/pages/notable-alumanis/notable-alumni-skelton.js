import styles from "./notable-alumanis.module.css"
import { Skeleton } from "@mui/material";

export function NotableAlumaniSkelton(){
    return(
        <div className={`${styles.mainWrapper}`}>
            <Skeleton 
                height={60} 
                className={styles.mobileImage}
                variant="rectangular" 
                sx={{marginBottom: "0.5rem"}}
            />
            <Skeleton 
                height={200} 
                className={styles.desktopImage}
                variant="rectangular" 
                sx={{borderRadius : '10px', marginBottom: "0.5rem"}}
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