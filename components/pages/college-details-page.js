import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CollegeDetailsBlogComponent } from "../organisms";

export function CollegeDetailsPage(){
    const [isLoading,setIsLoading] = useState(false)
    const {isReady} = useRouter()
    
    useEffect(()=>{
        if(!isReady) return
        setIsLoading(false)
    },[isReady])

    if(isLoading) return null

    return(
        <CollegeDetailsBlogComponent/>
    )
}