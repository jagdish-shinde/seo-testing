import Image from "next/image"
import { reward } from "../../../public"
import styles from "./ranking-section.module.css"
import HtmlParser from 'react-html-parser'

export function RankingSection({data}){
    return (
        <section id="rank">
            <h1 className={styles.heading}>Ranking</h1>
            <hr></hr>
            <div className={`section-padding ${styles.wrapper}`}>
                <div className={styles.container}>
                    <div className={styles.pointWrapper}>
                        {/* <div className={styles.logo}>
                            <Image 
                                src={reward}
                                width="100%"
                                height="100%"
                                layout="fill"
                                objectFit="fill"
                                />
                        </div> */}
                        <p>{data?.length>0 ? HtmlParser(data) : "This college is not yet Ranked by government and any other private institutions"}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}