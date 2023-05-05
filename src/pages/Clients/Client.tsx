import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import styles from "../../../styles/pages/Client.module.scss"
import { Grid, Modal } from "@mui/material";
import AddorUpdateClientForm from "../../components/ClientForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Client: FunctionComponent= ()=>{
    const navigate = useNavigate();
    const { clientId } = useParams();
    const [open, setOpen] = useState(false);
    const {loading, clients} = useAppSelector((state) => state.clients);
    const foundClient = clients.findIndex(client=>client.id == clientId);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    if(loading){
        return <h1>loading...</h1>
    }
    if(foundClient < 0) {
        return(
            <div>
                <h1>404 - Client not found</h1>
                <div className="button" onClick={()=>{navigate("/Gym-Dashboard/clients") }}>return to Clients</div>
            </div>
            )   
    }
    const client = clients[foundClient];

    return (
        <>
            <h1>{client.full_name + " Profile"}</h1>
            <div className={styles.Card}>
                <Grid container>
                    <Grid item xs={12} md={4} className="center" sx={{justifyContent: "center"}}>
                        <img src={client.avatar}
                            className={styles.avatar} 
                            alt={"client " + client.full_name}
                            onError={({ currentTarget }) => {
                            currentTarget.onerror = null; 
                            currentTarget.src="../images/admin.jpg";
                        }}/>
                    </Grid>
                    <Grid className={styles.description} item xs={12} md={8}>
                            <ul>
                                <li>Full Name: <span>{client.full_name}</span></li>
                                <li>Address: <span>{client.address}</span></li>
                                <li>Mobile Phone: <span>{client.mobile_number}</span></li>
                                <li>Subscription Plan: <span>{client.subscription_plan}</span></li>
                            </ul>
                            <div className="button" onClick={handleOpen}>Update Info</div>
                            <Modal open={open} onClose={handleClose} >
                                <AddorUpdateClientForm onClick={handleClose} oldclient={client} />
                            </Modal>
                    </Grid>
                </Grid>
            </div>
            <span className={styles.link} onClick={()=>{navigate("/Gym-Dashboard/clients")}}><ArrowBackIcon/> return to clients</span>
                
        </>
            
    )
}



export default Client;

