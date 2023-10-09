import { useRouter } from "next/router";
import styles from "./view-more-button.module.css"

export default function ViewMoreButton({btnText, pathname}) {
    const {push} = useRouter();

    function handelClick(){
        push({
            pathname
        })
    }
  return (
    <button className={styles.btn} onClick={handelClick}>
        {btnText}
    </button>
  )
}