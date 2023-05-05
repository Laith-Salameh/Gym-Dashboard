import { createSlice } from '@reduxjs/toolkit';
import { AddClient, getClients, DeleteClient, UpdateClient } from '../api/clients';

export interface IClient {
    id?: number
    full_name: string,
    mobile_number: string,
    address: string, 
    subscription_plan: "Premium Plan" | "Basic Plan" ,
    avatar: string,
    createdAt?: Date

}

interface IClientState {
    clients: IClient[],
    loading: boolean,
    error?: string
}
  
const initialState: IClientState = {
    clients: [],
    loading: false,
    error: ""
};

export const ClientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      //retrieve Clients
      builder.addCase(getClients.pending, state=>{
          state.loading = true;
      });
      builder.addCase(getClients.fulfilled, (state, action) => {
          state.loading = false;
          state.clients = action.payload;
          state.error = ''
      });
      builder.addCase(getClients.rejected, (state, action)=>{
        state.loading = false;
        state.clients = [];
        state.error = action.error.message;
      })

      //addClients
      builder.addCase(AddClient.pending, state=>{
        state.loading = true;
      });
      builder.addCase(AddClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
        state.error = ''
      });
      builder.addCase(AddClient.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message;
      })

      //update client
      builder.addCase(UpdateClient.pending, state=>{
        state.loading = true;
      });
      builder.addCase(UpdateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients= state.clients.filter(client=> client.id !== action.payload.id);
        state.clients.push(action.payload);
        state.error = ''
      });
      builder.addCase(UpdateClient.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message;
      })

      //delete client
      builder.addCase(DeleteClient.pending, state=>{
        state.loading = true;
      });
      builder.addCase(DeleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients= state.clients.filter(client=> client.id !== action.payload.id);
        state.error = ''
      });
  
    },
  });
  
export default ClientSlice.reducer;