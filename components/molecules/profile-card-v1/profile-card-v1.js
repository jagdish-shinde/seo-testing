import Image from 'next/image'
import styles from './profile-card-v1.module.css'

export default function ProfileCardV1({alumni = [], collegeName}) {
  const {name='', designation='', currentCompany='', estimateSalary='', profile='', graduationYear=''} = alumni
  return (
    <main className={styles.profileCardWrapper}>
        <picture className={styles.imageContainer}>
            <Image src={profile} height={"100%"} width={"100%"} layout='responsive' objectFit="cover" alt={`${collegeName} Notable Alumni : ${name}`}/>
        </picture>
        <div className={styles.infoContainer}>
                <p className={styles.userName}>{name}</p>
                <p className={styles.careerDetails}>{designation && `${designation} @ `}{currentCompany}</p>
                {graduationYear && <p className={styles.batchDetails}>{`Batch ${graduationYear}`}</p>}
                {estimateSalary && <p className={styles.salary}>{`Estimated salary ${estimateSalary?.includes("LPA") ? estimateSalary : (estimateSalary + " " + "LPA")}`}</p>}
        </div>
    </main>
  )
}