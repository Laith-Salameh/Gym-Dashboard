import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IClient } from '../features/clientSlice';

export const getClients = createAsyncThunk( "client/getAllClients" , async () : Promise< IClient[]> =>{
    const res = await axios.get('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/clients');
    return res.data
}) 

export const AddClient = createAsyncThunk( "client/addClient" , async ( client: IClient) : Promise< IClient> =>{
    const res = await axios.post('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/clients', {...client});
    return res.data
}) 
export const UpdateClient = createAsyncThunk( "client/updateClient" , async ( client: IClient) : Promise< IClient> =>{
    const res = await axios.put('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/clients/' + client.id, {...client});
    return res.data
}) 

export const DeleteClient = createAsyncThunk( "client/deleteClient" , async ( id: number) : Promise<IClient> =>{
    const res = await axios.delete('https://64103182e1212d9cc92c334f.mockapi.io/api/gym/clients/' + id);
    return res.data
}) 