import Image from "next/image"
import { useRouter } from "next/router"
import { fstLogo } from "../../../public"
import styles from "./header.module.css"
export function Header({
    customWrapperStyle,
    customLogoStyle
}){
    const router = useRouter()
    function handleClick(){
        router.push(process.env.NEXT_PUBLIC_FST_WEBSITE_URL)
    }
    return(
        <div className={`${styles.mainWrapper} ${customWrapperStyle}`}>
            <picture className={`${styles.imgWrapper} ${customLogoStyle}`} onClick={()=>{handleClick()}}>
                <Image 
                    src={fstLogo}
                    height="100%"
                    width="100%"
                    objectFit="fill"
                    layout="fill"
                />
            </picture>
        </div>
    )
}