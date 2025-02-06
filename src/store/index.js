import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../store/features/todo'

const store  = configureStore({
    reducer :{todo :  todoReducer}
})

export default store ;