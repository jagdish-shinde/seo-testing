import { useRouter } from "next/router";
import styles from "./back-navigation-button.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackNavigationButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className={styles.backNavigate} onClick={()=>handleGoBack()}> 
      <ArrowBackIcon className={styles.arrow} sx={{fontSize:"0.8rem"}}/>
      <p>BACK</p>
    </div>
  )
}
