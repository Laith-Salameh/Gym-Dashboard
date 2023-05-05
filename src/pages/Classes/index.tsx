import { FunctionComponent, useState } from "react";
import ItemGrid from "../../components/ItemGrid";
import { useAppSelector } from "../../store/store";
import AddIcon from '@mui/icons-material/Add';
import { Modal } from "@mui/material";
import AddorUpdateClassForm from "../../components/ClassForm"

const Classes: FunctionComponent = ()=>{
    const {loading, classes} = useAppSelector((state) => state.classes);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <h1>Gym Classes</h1>
            <div className="button center" onClick={handleOpen}>
                <AddIcon fontSize="medium"/> 
                <span>Add new</span>
            </div>
            <Modal open={open} onClose={handleClose} >
                <AddorUpdateClassForm onClick={handleClose}  />
            </Modal>
            <ItemGrid items={classes} loading={loading}/>
        </>
    )
}

export default Classes;