import styles from "./common-info-table.module.css"

export function CommonDataTable({
    data=[],
    customWrapperStyle,
    customRowStyle
}){
    return(
        <div className={`${styles.wrapper} ${customWrapperStyle}`}>
            {data.map(({keyName,value},index)=>
                <div className={`${styles.row} ${customRowStyle}`} key={index}>
                    <p>{keyName}</p>
                    <p>{value}</p>
                </div>
            )}
    </div>
    )
}