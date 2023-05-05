import { forwardRef, useReducer } from "react";
import styles from "../../styles/components/AddClassForm.module.scss"
import TextField from "./UI/TextField";
import { useAppDispatch } from "../store/store";
import { Close } from "@mui/icons-material";
import { IClass } from "../store/features/classSlice";
import { AddClass, UpdateClass } from "../store/api/classes";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";

const AddorUpdateClientForm  = forwardRef((props: {onClick: ()=> void, oldgymclass?: IClass}, _)=>{
    const isUpdate = props.oldgymclass ? true: false;
    const initial: IClass = props.oldgymclass
                                    ? { ...props.oldgymclass}
                                    : { title: "", coach_name: "Sara", coach_brief: "" , description: "", image: "/images/admin.jpg", price: 0, timing: (new Date()).toString() };

    const [ state, reduce ] = useReducer(  reducer , initial );
    const dispatch = useAppDispatch();
    const allowCreate = state.title != ""  && state.coach_brief != "" && state.description != "";
    const handleChange = (type: FormActionKinds, value: string | number )=>{
        reduce( {type,value})
    }
    const handleClick = ()=>{
        if(allowCreate){
            if(isUpdate){
                dispatch(UpdateClass({...state, createdAt: new Date(), id: props.oldgymclass?.id}))
            }else{
                dispatch(AddClass({...state, createdAt: new Date()}))
            }
            props.onClick();
        }
    }
    return(
        <div tabIndex={-1} className={styles.wrapper + " center-column"}>
            <Close className={styles.close} {...props}/>
            <h2 className={styles.title}>{isUpdate? "Edit Class" : "New Class"}</h2>
            <TextField className={styles.textarea}
                    aria-label="maximum height"
                    label= "Title" 
                    variant="standard"
                    value={state.title}
                    error={state.title == ""}
                    onChange={(e)=>{handleChange(FormActionKinds.title, e.target.value)}}
                      />
            <TextField className={styles.price}
                    aria-label="maximum height"
                    label= "Price" 
                    variant="standard"
                    value={state.price}
                    error={!isPrice(state.price.toString())}
                    onChange={(e)=>{handleChange(FormActionKinds.price, e.target.value)}}
                      />
            <TextField className={styles.textarea}
                    aria-label="maximum height"
                    label= "Description" 
                    variant="standard"
                    multiline
                    maxRows={2}
                    minRows={2}
                    value={state.description}
                    error={state.description == ""}
                    onChange={(e)=>{handleChange(FormActionKinds.description, e.target.value)}}
                      />
            <TextField className={styles.textarea}
                    aria-label="maximum height"
                    label= "Coach Brief" 
                    variant="standard"
                    multiline
                    maxRows={2}
                    minRows={2}
                    value={state.coach_brief}
                    error={state.coach_brief == ""}
                    onChange={(e)=>{handleChange(FormActionKinds.coach_brief, e.target.value)}}
                      />
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                label="Controlled picker"
                value={dayjs(state.timing)}
                onChange={(newValue) => handleChange( FormActionKinds.timing, newValue?.toString() ?? (new Date()).toString())}
                />
            </DemoContainer>
     
            <div tabIndex={4} className={allowCreate ? "button-inverted" : "button-disabled"} onClick={handleClick}>{isUpdate? "Edit" : "Creat"}</div>
        </div>
    ) 
    })

const isPrice = (str : string)=>( /^\d+$/.test(str)) 
enum FormActionKinds {
    title ="TITLE", 
    coach_name = "COACH", 
    coach_brief= "COACH_BRIEF", 
    description = "DESCRIPTION", 
    price = "PRICE", 
    timing= "TIMING"
}
      
// An interface for our actions
interface FormAction {
    type: FormActionKinds;
    value: string | number ;
}
      
const reducer = ( state: IClass, action: FormAction)=>{
    const { type, value } = action;
    switch(type){
        case FormActionKinds.title:
            return { 
                ...state,
                title: value as string,   
            };
        case FormActionKinds.coach_name:
            return { 
            ...state,
            coach_name: value as "Sara" | "Jake" | "Mike",   
            };
        case FormActionKinds.timing:
            return { 
                ...state,
                timing: value as string,   
            };
        case FormActionKinds.price:
            return { 
                ...state,
                price: value as number,   
            };
        case FormActionKinds.coach_brief:
            return { 
                ...state,
                coach_brief : value as string,   
            };
        case FormActionKinds.description:
            return { 
                ...state,
                description : value as string,   
            };
    }
}

export default AddorUpdateClientForm;