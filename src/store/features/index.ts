import { combineReducers } from 'redux'
import clients from './clientSlice'
import classes from "./classSlice"

export default combineReducers({
    clients,
    classes
 })