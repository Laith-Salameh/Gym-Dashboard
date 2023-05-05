import { createSlice } from '@reduxjs/toolkit';
import { AddClass, getClasses, DeleteClass, UpdateClass } from '../api/classes';

export interface IClass {
    id?: number
    title: string
    image: string
    coach_name: "Sara" | "Jake" | "Mike"
    timing: string
    price: number
    description: string
    coach_brief: string
    createdAt?: Date

}

interface IClassState {
    classes: IClass[],
    loading: boolean,
    error?: string
}
  
const initialState: IClassState = {
    classes: [],
    loading: false,
    error: ""
};

export const ClassSlice = createSlice({
    name: "class",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      //retrieve Classs
      builder.addCase(getClasses.pending, state=>{
          state.loading = true;
      });
      builder.addCase(getClasses.fulfilled, (state, action) => {
          state.loading = false;
          state.classes = action.payload;
          state.error = ''
      });
      builder.addCase(getClasses.rejected, (state, action)=>{
        state.loading = false;
        state.classes = [];
        state.error = action.error.message;
      })

      //addClasss
      builder.addCase(AddClass.pending, state=>{
        state.loading = true;
      });
      builder.addCase(AddClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes.push(action.payload);
        state.error = ''
      });
      builder.addCase(AddClass.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message;
      })

      //update class
      builder.addCase(UpdateClass.pending, state=>{
        state.loading = true;
      });
      builder.addCase(UpdateClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes= state.classes.filter(gymClass=> gymClass.id !== action.payload.id);
        state.classes.push(action.payload);
        state.error = ''
      });
      builder.addCase(UpdateClass.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message;
      })

      //delete class
      builder.addCase(DeleteClass.pending, state=>{
        state.loading = true;
      });
      builder.addCase(DeleteClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classes= state.classes.filter(gymClass=> gymClass.id !== action.payload.id);
        state.error = ''
      });
      builder.addCase(DeleteClass.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error.message;
      })
  
    },
  });
  
export default ClassSlice.reducer;