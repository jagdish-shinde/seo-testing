import { useRouter } from "next/router";
import styles from "./back-navigation-button.module.css"

export default function BackNavigationButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <button className={styles.backNavigate} onClick={()=>handleGoBack()}> <span className={styles.arrow}>&larr;</span>BACK</button>
  )
}
