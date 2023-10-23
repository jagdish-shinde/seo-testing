import { useEffect, useState } from 'react';
import styles from './video-player.module.css'
import ReactPlayer from 'react-player';
import { Loader } from '../../atoms';

export function VideoPlayer ({
    customStyle,
    videoUrl = ''
} ) {

    const [isVideoReady, setIsVideoReady] = useState(false)

    const handleVideoReady = () => {
        setIsVideoReady(true)
    }
    return (
        <div className={`${styles.video} ${customStyle}`}>
            <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls
                onReady={handleVideoReady}             
            />
           {!isVideoReady && (
            <div className={styles.loaderWrapper}>
               <Loader/>
            </div>
        )}
        </div>
    )
}