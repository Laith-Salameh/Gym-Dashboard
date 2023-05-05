import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid";
import { IClient } from "../store/features/clientSlice";
import { IClass } from "../store/features/classSlice";
import {Close as CloseIcon} from '@mui/icons-material';
//styles
import styles from "../../styles/components/ItemGrid.module.scss"
import { useAppDispatch } from "../store/store";
import { DeleteClient } from "../store/api/clients";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { DeleteClass } from "../store/api/classes";

const ItemGrid: FunctionComponent<{items: IClient[] | IClass[], loading: boolean}> = ({items, loading})=>{
    return (
        <Grid container spacing={2}>
            {
                loading 
                ?<>
                {
                    Array(4).fill(0).map((_, i)=>(
                        <Grid key={i} item xs={12} sm={6} md={3} lg={3}>
                            <div className={styles.Card + " center-column "}  >
                                <Skeleton animation="wave" variant="circular" sx={{ bgcolor: '#a9a9a94d' }} width={100} height={100}/>
                                <Skeleton animation="wave" sx={{ bgcolor: '#a9a9a94d' }} width={"80%"} height={"20%"}/>
                                <Skeleton animation="wave" sx={{ bgcolor: '#a9a9a94d' }} width={"40%"} height={"20%"}/>
                            </div>
                        </Grid>
                    ))
                }
                </>   
                :<>
                {
                    items.map((item,i)=>(      
                        <Grid key={i} item xs={12} sm={6} md={3} lg={3}>
                            { instanceOfClient(item)? <ClientCard client={item} /> : <ClassCard gymClass={item} />}
                        </Grid>
                    ))
                }
                </>
           
                }
        </Grid>
    )

}

const ClientCard: FunctionComponent<{client: IClient}> = ({client})=>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleDelete(id: number){
        dispatch( DeleteClient(id));
    }
    
    return (
        <div className={styles.Card + " center-column "}  >
            <img src={client.avatar} 
                 alt={"client " + client.full_name}
                 onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/images/admin.jpg";
                  }}/>
            <h3>{client.full_name}</h3>
            <span>{client.subscription_plan}</span>
            <div className="button" onClick={()=>{ navigate("/clients/" + client.id)}}>View more</div>
            <CloseIcon className={styles.close} onClick={()=>{handleDelete(client.id ?? -1)}}/>
        </div>
    )
}

const ClassCard: FunctionComponent<{gymClass: IClass}> = ({gymClass})=>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleDelete(id: number){
        dispatch( DeleteClass(id));
    }
    
    return (
        <div className={styles.Card + " center-column "}  >
            <img src={gymClass.image} 
                 alt={"client " + gymClass.title}
                 onError={({ currentTarget }) => {
                    currentTarget.onerror = null; 
                    currentTarget.src="/images/admin.jpg";
                  }}/>
            <h3>{gymClass.title}</h3>   
            <span>{gymClass.coach_name}</span>         
            <div className="button" onClick={()=>{ navigate("/classes/" + gymClass.id)}}>View more</div>
            <CloseIcon className={styles.close} onClick={()=>{handleDelete(gymClass.id ?? -1)}}/>
        </div>
    )
}


function instanceOfClient(object: any): object is IClient {
    return 'avatar' in object;
}


export default ItemGrid;