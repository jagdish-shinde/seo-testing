import Dialog from '@mui/material/Dialog';
import styles from "./navigation-dialog.module.css"
export function NavigationDialog({
    isOpen,
    options=[],
    handleOnItemClick = ()=>{},
    setIsDialogOpen
}){

    return (
        <Dialog open={isOpen} maxWidth="xl">
            <div className={styles.wrapper}>
                <p onClick={()=>setIsDialogOpen(false)}>X</p>
                {options.map(({heading,id},index)=>
                    <p onClick={()=>handleOnItemClick(id,"mobile",heading)} key={index}>{heading}</p> 
                )}
            </div>
        </Dialog>
    )
}