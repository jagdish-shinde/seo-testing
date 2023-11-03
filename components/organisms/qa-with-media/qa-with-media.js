import Image from 'next/image'
import styles from './qa-with-media.module.css'
import { QaCard, VideoPlayer } from '../../molecules'
import { Fragment } from 'react'
import HtmlParser from 'react-html-parser'
import { MEDIA_TYPES } from '../../../util/constants'

export function QAContentWithMedia ({data}) {
    const {
        description = '',
        title = '',
        lists = [],
        media ,
    } = data || {}


    return(
        <Fragment>
            {
                (title || description || media) && 
                <div className={`section-padding ${styles.wrapper}`}>
                    {
                        (title || description) &&
                            <div className={styles.leftSec}>
                                {
                                    title &&  
                                    <h6 className={styles.question}>{title}</h6>
                                }
                                {
                                    title && (description || media) && (
                                        <div className={styles.hrLine}></div>
                                    )
                                }
                                {
                                    description && 
                                    <p className={styles.answer}>{HtmlParser(description)}</p>
                                }
                            </div>
                    }

                    {
                        media && 
                        <div className={styles.rightSec}>
                        {
                            media.type === MEDIA_TYPES?.image &&
                            <Image
                                src={media?.link || ''}
                                height='100%'
                                width='100%'
                                objectFit='cover'
                                layout='fill'
                                alt = {media?.altText || 'subsectionImage'}  
                            /> 
                        }
                        {
                            media.type === MEDIA_TYPES?.video &&
                            <VideoPlayer 
                                videoUrl = {media?.link || ''}
                                customStyle = {styles.customVideo}
                            /> 

                        }
                    </div>

                    }

                </div>

            }

            {
                lists?.length > 0 &&
                <div className={`section-padding ${styles.qaCards}`}>
                    {
                        lists?.map(data => (
                            <QaCard 
                                data = {data}
                                key = {data?._id}
                            />
                        ))
                    }
                </div> 
            }
              
        </Fragment>
    )
}