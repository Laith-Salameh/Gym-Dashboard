import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import styles from "../../../styles/pages/Class.module.scss"
import { Grid, Modal } from "@mui/material";
import AddorUpdateClassForm from "../../components/ClassForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GymClass: FunctionComponent= ()=>{
    const navigate = useNavigate();
    const { classId } = useParams();
    const [open, setOpen] = useState(false);
    const {loading, classes} = useAppSelector((state) => state.classes);
    const foundClass = classes.findIndex(gymClass=>gymClass.id == classId);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    if(loading){
        return <h1>loading...</h1>
    }
    if(foundClass < 0) {
        return(
            <div>
                <h1>404 - Class not found</h1>
                <div className="button" onClick={()=>{navigate("/classes") }}>return to Classes</div>
            </div>
            )   
    }
    const gymClass = classes[foundClass];
    const time = new Date(gymClass.timing);
    return (
        <>
            <h1>{gymClass.title + " Class"}</h1>
            <div className={styles.Card}>
                <Grid container>
                    <Grid item xs={12} md={4} className="center" sx={{justifyContent: "center"}}>
                        <img src={gymClass.image}
                            className={styles.avatar} 
                            alt={"class " + gymClass.title}
                            onError={({ currentTarget }) => {
                            currentTarget.onerror = null; 
                            currentTarget.src="/images/admin.jpg";
                        }}/>
                    </Grid>
                    <Grid className={styles.description} item xs={12} md={8}>
                            <ul>
                                <li>Title: <span>{gymClass.title}</span></li>
                                <li>Time: <span>{ time.getDate() + ", " + months[time.getMonth()] +", "+ time.getFullYear()}</span></li>
                                <li>Coach: <span>{gymClass.coach_name}</span></li>
                                <li>Price: <span>{gymClass.price}</span></li>
                                <li>Description: <p>{gymClass.description}</p></li>
                                <li>Coach Brief: <p>{gymClass.coach_brief}</p></li>

                            </ul>
                            <div className="button" onClick={handleOpen}>Update Info</div>
                            <Modal open={open} onClose={handleClose} >
                                <AddorUpdateClassForm onClick={handleClose} oldgymclass={gymClass} />
                            </Modal>
                            
                    </Grid>
                </Grid>
            </div>
            <span className={styles.link} onClick={()=>{navigate("/classes")}}><ArrowBackIcon/> return to classes</span>
                
        </>
            
    )
}


const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default GymClass;

