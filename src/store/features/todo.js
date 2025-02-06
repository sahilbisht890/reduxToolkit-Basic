import { createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    tasks : [{id : 1 , text : "complete the app ui"}]
}

const todoSlicer = createSlice({
    name : 'Todo',
    initialState,
    reducers : {
       addTodo : (state , action) => { 
         state.tasks.push({id : nanoid() , text : action.payload});
       },
       deleteTodo : (state , action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
       },
       editTodo : (state , action) => {
        const {index , text } = action.payload
         state.tasks[index].text = text ;
       }
    }
})

export const {addTodo , deleteTodo , editTodo} = todoSlicer.actions;

export default todoSlicer.reducer;