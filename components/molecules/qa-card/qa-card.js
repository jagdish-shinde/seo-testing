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
        title = ''
    } = data|| {}

    const maxCharacterMobile = 55;
    const maxCharacterDesktop = 100;

    useEffect(() => {
        if(description?.length <= maxCharacterMobile){
            setShowFullText(true)
        }
        if(description?.length <= maxCharacterDesktop){
            setShowFullTextDekstop(true)
        }
    },[description])

    return (
        <div className={styles.wrapper}>

            <div className={styles.leftSec}>
                <Image
                    src={image}
                    height='100%'
                    width='100%'
                    objectFit='cover'
                    layout='fill'
                    alt='question image'
                />
            </div>

            <div className={styles.rightSec}>
                <p className={styles.title}>{title}</p>

                <div className={styles.textContaintMobile}>

                    <div className={
                            showFullText && description?.length > maxCharacterMobile ? 
                            styles.fullDesc : styles.description
                    }>
                        { 
                            showFullText ? 
                            HtmlParser(description) : 
                            HtmlParser(description?.substring(0, maxCharacterMobile))
                        }
                    </div>
                    <span className={styles.viewMore} onClick={()=>setShowFullText(!showFullText)}>
                        {!showFullText ? 'View More' : 'View Less'}
                    </span>

                </div>

                <div className={styles.textContaintDekstop}>

                    <div className={
                        showFullTextDekstop && description?.length > maxCharacterDesktop ? 
                        styles.fullDesc : styles.description
                    }>
                        {
                            showFullTextDekstop ? 
                            HtmlParser(description) : 
                            HtmlParser(description?.substring(0, maxCharacterDesktop))
                        }
                        <span className={styles.viewMore} onClick={()=>setShowFullTextDekstop(!showFullTextDekstop)}>
                            {!showFullTextDekstop ? 'View More' : 'View Less'}
                        </span>

                    </div>
                </div>
            </div>  
        </div>
    )
}