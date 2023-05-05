import { FunctionComponent, useState } from "react";
import ItemGrid from "../../components/ItemGrid";
import { useAppSelector } from "../../store/store";
import AddIcon from '@mui/icons-material/Add';
import { Modal } from "@mui/material";
import AddClientForm from "../../components/ClientForm";

const Clients: FunctionComponent = ()=>{
    const {loading, clients} = useAppSelector((state) => state.clients);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <h1>Gym Clients</h1>
            <div className="button center" onClick={handleOpen}>
                <AddIcon fontSize="medium"/> 
                <span>Add new</span>
            </div>
            <Modal open={open} onClose={handleClose} >
                <AddClientForm onClick={handleClose} />
            </Modal>
            <ItemGrid items={clients} loading={loading}/>
        </>
    )
}

export default Clients;