import Image from 'next/image'
import styles from './qa-card.module.css'
import { useEffect, useState } from 'react';
import HtmlParser from 'react-html-parser';

export function QaCard ({data}) {
    const [showFullText, setShowFullText] = useState(false);
    const [showFullTextDekstop, setShowFullTextDekstop] = useState(false)
    const [isExpandanleTextMobile, setIsExpandanleTextMobile] = useState(false)
    const [isExpandanleTextDesktop, setIsExpandanleTextDesktop] = useState(false)

    let {
        description = '',
        image = '',
        title = ''
    } = data|| {}

    const maxCharacterMobile = 55;
    const maxCharacterDesktop = 150;

    useEffect(() => {

        const descriptionText = HtmlParser(description)?.[0].props?.children?.[0] || description
        if(descriptionText?.length <= maxCharacterMobile){
            setShowFullText(true)
        }else{
            setIsExpandanleTextMobile(true)
        }
        if(descriptionText?.length <= maxCharacterDesktop){
            setShowFullTextDekstop(true)
        }else{
            setIsExpandanleTextDesktop(true)
        }
    },[description])

    return (
        <div className={`${styles.wrapper} ${isExpandanleTextDesktop && styles.container}`}>

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
                    {
                        isExpandanleTextMobile && 
                        <span className={styles.viewMore} onClick={()=>setShowFullText(!showFullText)}>
                            {!showFullText ? 'View More' : 'View Less'}
                        </span>
                    }

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
                        {
                            isExpandanleTextDesktop &&
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