import Image from "next/image"
import { downArrow } from "../../../public"
import { NavigationDialog } from "../navigation-dialog/navigation-dialog"
import styles from "./content-navabar.module.css"

export function ContentNavbar({
    data =[],
    handleClick = ()=>{},
    isDialogOpen = false,
    setIsDialogOpen = () =>{},
    selectedValue
}){
    return(
        <div>
            <div className={styles.facilitiesWrapper}>
                {data.map(({icon,heading,id},index)=>
                    <div className={styles.facility} onClick={()=>{handleClick(id)}} key={index}>
                        <div className={styles.facilityIcon}>
                            <Image 
                                src={icon}
                                width="100%"
                                height="100%"
                                objectFit='fill'
                                layout='fill'
                            />
                        </div>
                        <p>{heading}</p>
                    </div>
                )}
            </div>
            <div className={styles.quickNavigation} onClick={()=>setIsDialogOpen(true)}>
                <p>{selectedValue}</p>
                <div>
                    <Image
                        src={downArrow}    
                    />
                </div>
            </div>
            <NavigationDialog 
                isOpen={isDialogOpen}
                options={data}
                handleOnItemClick={handleClick}
                setIsDialogOpen = {setIsDialogOpen}
            />
        </div>
    )
}