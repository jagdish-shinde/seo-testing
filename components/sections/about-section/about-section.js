import Image from "next/image"
import HtmlParser from "react-html-parser"
import { tick } from "../../../public"
import styles from "./about-section.module.css"

export function AboutSection({data, collegeName}){
    return(
        <section id="about">
            <h1 className={styles.heading}>About {collegeName}</h1>
            <hr></hr>
            <div className={`section-padding ${styles.wrapper}`}>
                <div>
                    <div className={styles.iconWithText}>
                        {/* <div className={styles.imgWrapper}>
                            <Image
                                src={tick}
                                width="100%"
                                height="100%"
                                objectFit="fill"
                                layout="fill"
                            />
                        </div> */}
                        <div>{HtmlParser(data)}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}