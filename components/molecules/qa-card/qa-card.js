import Image from 'next/image'
import styles from './qa-card.module.css'
import { useEffect, useState } from 'react';
import HtmlParser from 'react-html-parser';

export function QaCard ({data}) {
    const [showFullText, setShowFullText] = useState(false);
    const [showFullTextDekstop, setShowFullTextDekstop] = useState(false)

    let {
        description = '',
        image = '',
        title = '',
        altText = 'listImage'
    } = data|| {}

    return (
        <div className={styles.wrapper}>

            <div className={styles.leftSec}>
                <Image
                    src={image}
                    height='100%'
                    width='100%'
                    objectFit='cover'
                    layout='fill'
                    alt={altText}
                />
            </div>

            <div className={styles.rightSec}>
                <p className={styles.title}>{title}</p>

                <div className={styles.textContaintMobile}>

                    <div className={
                            showFullText ? 
                            styles.fullDesc : styles.description
                    }>
                        { 
                            HtmlParser(description) 
                        }
                    </div>
                    {
                        <span className={styles.viewMore} onClick={()=>setShowFullText(!showFullText)}>
                            {!showFullText ? 'View More' : 'View Less'}
                        </span>
                    }

                </div>

                <div className={styles.textContaintDekstop}>

                    <div className={
                        showFullTextDekstop ? 
                        styles.fullDesc : styles.description
                    }>
                        {
                            HtmlParser(description) 
                        }
                        {
                            <span className={styles.viewMore} onClick={()=>setShowFullTextDekstop(!showFullTextDekstop)}>
                                {!showFullTextDekstop ? 'View More' : 'View Less'}
                            </span>
                        }
                    </div>
                </div>
            </div>  
        </div>
    )
}