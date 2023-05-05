import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IClass } from '../features/classSlice';

export const getClasses = createAsyncThunk( "class/getAllClasses" , async () : Promise< IClass[]> =>{
    const res = await axios.get('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes');
    return res.data
}) 

export const AddClass = createAsyncThunk( "class/addClass", async ( gymClass: IClass) : Promise< IClass> => {
    const res = await axios.post('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes', {...gymClass});
    return res.data
}) 

export const UpdateClass = createAsyncThunk( "class/updateClass" , async ( gymClass: IClass) : Promise< IClass> =>{
    const res = await axios.put('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes/' + gymClass.id, {...gymClass});
    return res.data
}) 

export const DeleteClass = createAsyncThunk( "class/deleteClass" , async ( id: number) : Promise<IClass> =>{
    const res = await axios.delete('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/classes/' + id);
    return res.data
}) 