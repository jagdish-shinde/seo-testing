import { useRouter } from "next/router";
import styles from "./view-more-button.module.css"

export default function ViewMoreButton({btnText, pathname,isOpenInNewWindow=false}) {
    const {push} = useRouter();

    function handelClick(){
      if(isOpenInNewWindow){
        window.open(`/blog/${pathname}`,'_blank')
      }else{
        push({
            pathname
        })
      }
    }
  return (
    <p className={styles.btn} onClick={handelClick}>
        {btnText}
    </p>
  )
}