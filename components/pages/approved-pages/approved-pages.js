import { Fragment, useEffect, useState } from 'react'
import styles from './approved-pages.module.css'
import { useRouter } from 'next/router'
import { getApprovedPages } from '../../../apis/seo-page/get-approved-pages'
import { Header } from '../../molecules'
import { FooterSection } from '../../sections'
import Link from 'next/link'
import WhatsappCommunityBtn from '../../atoms/whatsapp-community-btn/whatsapp-community-btn'


export function ApprovedPages () {

    const [pages, setPages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {isReady} = useRouter()

    useEffect(() => {
        if(!isReady) return 
        getAllApprovedPages()
    },[isReady])

    async function getAllApprovedPages() {
        try {
            const data = await getApprovedPages()
            setPages(data)
        }
        catch(error){
            console.log(error?.message || error)
        }
        finally{
            setIsLoading(false)
        }
    }
    if(isLoading) return null
    
    return(
        <Fragment>

            <Header 
                customWrapperStyle={styles.header} 
                pageTitle='All approved pages'
            />

            <div className={`section-padding ${styles.orderedList}`}>
                {pages.map(({slug, _id, link = ''}, index)=> (
                    <div className={styles.linkContainer} key={_id || index}>
                        <span>{index + 1}</span>
                        <Link href={link} 
                            className={styles.linkText}
                        >
                            <a 
                                className={styles.anchor} 
                                target='_blank'
                            >{slug || ''} </a>
                        </Link>
                    </div>
                ))}
            </div>

            <FooterSection 
                customStyle = {styles.footer}
            />
            <WhatsappCommunityBtn 
                pageTitle={'All approved pages'}
            />

        </Fragment>
    )
}