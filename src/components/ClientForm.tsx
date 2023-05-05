import { forwardRef, useReducer } from "react";
import styles from "../../styles/components/AddClientForm.module.scss"
import { IClient } from "../store/features/clientSlice";
import TextField from "./UI/TextField";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import variables from "../../styles/Variables.module.scss"
import { useAppDispatch } from "../store/store";
import { AddClient, UpdateClient } from "../store/api/clients";
import { Close } from "@mui/icons-material";

const AddorUpdateClientForm  = forwardRef((props: {onClick: ()=> void, oldclient?: IClient}, _)=>{
    const isUpdate = props.oldclient ? true: false;
    const initial: IClient = props.oldclient
                                    ? { ...props.oldclient}
                                    : { full_name: "", mobile_number:"" , address:"", subscription_plan: "Basic Plan", avatar:"/images/admin.jpg" };

    const [ state, reduce ] = useReducer(  reducer , initial );
    const dispatch = useAppDispatch();
    const allowCreate = state.full_name != "" && isMobilePhone(state.mobile_number) && state.address != "";
    const handleChange = (type: FormActionKinds, value: string)=>{
        reduce( {type,value})
    }
    const handleClick = ()=>{
        if(allowCreate){
            if(isUpdate){
                dispatch(UpdateClient({...state, createdAt: new Date(), id: props.oldclient?.id}))
            }else{
                dispatch(AddClient({...state, createdAt: new Date()}))
            }
            props.onClick();
        }
    }
    return(
        <div tabIndex={-1} className={styles.wrapper + " center-column"}>
            <Close className={styles.close} {...props}/>
            <h2 className={styles.title}>{isUpdate? "Edit Client" : "New Client"}</h2>
            <TextField className={styles.textarea}
                    aria-label="maximum height"
                    label= "Full Name" 
                    variant="standard"
                    value={state.full_name}
                    error={state.full_name == ""}
                    onChange={(e)=>{handleChange(FormActionKinds.full_name, e.target.value)}}
                      />
            <TextField className={styles.textarea}
                    aria-label="maximum height"
                    label= "Address" 
                    variant="standard"
                    value={state.address}
                    error={state.address == ""}
                    onChange={(e)=>{handleChange(FormActionKinds.address, e.target.value)}}
                      />
            <TextField className={styles.textarea}
                    aria-label="maximum height"
                    label= "Mobile Number" 
                    variant="standard"
                    value={state.mobile_number}
                    error={!(isMobilePhone(state.mobile_number))}
                    onChange={(e)=>{handleChange(FormActionKinds.mobile_number, e.target.value)}}
                      />
            <RadioGroup onChange={(e)=>{handleChange(FormActionKinds.subscription_plan, e.target.value)}}>
                <FormControlLabel checked={state.subscription_plan == "Basic Plan"} value="Basic Plan" control={<Radio sx={{color: variables.accentColor ,'&.Mui-checked': {color: variables.accentColor,},}}/>} label="Basic Plan" />
                <FormControlLabel value="Premium Plan" control={<Radio sx={{color: variables.accentColor ,'&.Mui-checked': {color: variables.accentColor,},}} />} label="Premium Plan" />
            </RadioGroup>
            <div tabIndex={4} className={allowCreate ? "button-inverted" : "button-disabled"} onClick={handleClick}>{isUpdate? "Edit" : "Creat"}</div>
        </div>
    ) 
    })


const isMobilePhone = (str : string)=>( /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(str)) 
enum FormActionKinds {
    full_name = 'FULL_NAME',
    mobile_number = 'MOBILE_NUMBER',
    address = "ADDRESS",
    subscription_plan = "SUBSCRIPTION_PLAN",
    avatar= "AVATAR"
}
      
// An interface for our actions
interface FormAction {
    type: FormActionKinds;
    value: string;
}
      
const reducer = ( state: IClient, action: FormAction)=>{
    const { type, value } = action;
    switch(type){
        case FormActionKinds.full_name:
            return { 
                ...state,
                full_name: value,   
            };
        case FormActionKinds.mobile_number:
            return { 
            ...state,
            mobile_number: value,   
            };
        case FormActionKinds.address:
            return { 
                ...state,
                address: value,   
            };
        case FormActionKinds.subscription_plan:
            return { 
                ...state,
                subscription_plan: value as "Premium Plan" | "Basic Plan",   
            };
        case FormActionKinds.avatar:
            return { 
                ...state,
                avatar: value,   
            };
    }
}

export default AddorUpdateClientForm;