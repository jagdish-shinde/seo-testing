import { useState, useRef } from 'react';
import styles from './scrollable-list.module.css';


export function ScrollableListWrapper({
    children,
    className,
    areDotsVisible = true, //hidden by default in desktop view
    areNavArrowsVisible = false, //hidden by default in mobile view
    length= 0, // required if children is not an array
    selectedDotColor //default color is a shade of blue
}) {
    const [scrollPositionIndex, setScrollPositionIndex] = useState(0)
    const [isRightArrowEnabled, setIsRightArrowEnabled] = useState(true)
    const [isLeftArrowEnabled, setIsLeftArrowEnabled] = useState(false)
    const scrollContainerRef = useRef(null)
    const scrollBy = useRef(null)

    if (Array.isArray(children))
        length = children.length
        
        
    const dotArray = new Array(length).fill(1)


    // TODO: throttle scroll event

    function handleOnScroll(e) {
        if (!areDotsVisible && !areNavArrowsVisible)
            return 
        
        e.preventDefault()

        // index is being calculated for mobile view
        const index = Math.floor(e.target.scrollLeft / e.target.offsetWidth)
        const isScrolledTillEnd =
            e.target.scrollLeft + e.target.clientWidth === e.target.scrollWidth;

        setScrollPositionIndex(index)
        setIsLeftArrowEnabled(!!e.target.scrollLeft)
        setIsRightArrowEnabled(!isScrolledTillEnd)
    }

    function handleOnClickLeftArrow() {
        if (!isLeftArrowEnabled)
            return 
        
        scrollContainerRef.current.scrollLeft -= scrollBy.current
    }
    
    

    function handleOnClickRightArrow() {
        if (!isRightArrowEnabled)
            return 
        
        if (!scrollBy.current) {
            const element = scrollContainerRef.current.children[0]
            // getting the width of the first child element
            // assuming all children have same width
            scrollBy.current = element.offsetWidth
        }
        scrollContainerRef.current.scrollLeft += scrollBy.current
    }

    const rightArrowStyle = isRightArrowEnabled ? styles.rightArrow : styles.rightArrow + ' ' + styles.disabledArrow
    const leftArrowStyle = isLeftArrowEnabled ? styles.leftArrow : styles.leftArrow + ' ' + styles.disabledArrow

    return (
        <div className={styles.wrapper}>
            {areNavArrowsVisible && <div onClick={handleOnClickLeftArrow} className={leftArrowStyle} />}
            
            <div
                className={`${styles.scrollableList} ${className}`}
                onScroll={handleOnScroll}
                ref={scrollContainerRef}
            >
                {children}
            </div>

            {areDotsVisible && (
                <div className={styles.dotContainer}>
                    {dotArray.map((_, index) => (
                        <div
                            className={index === scrollPositionIndex ? styles.selectedDot : styles.dot}
                            key={String(index)} 
                            style={index === scrollPositionIndex && selectedDotColor ? {backgroundColor:selectedDotColor} : {}}
                        />
                    ))}
                </div>
            )}

            {(areNavArrowsVisible && (length > 2)) && <div onClick={handleOnClickRightArrow} className={rightArrowStyle} />}
        </div>
    )
}
