import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./food/foodSlice";
import categoryReducer from './category/categorySlice';
import userReducer from './auth/authSlice';
import deskReducer from './desk/deskSlice';



// luu tru toan bo du lieu cua app
// dung de tao ra trang thai ban dau
export default configureStore({
  reducer: {
    userReducer,
    foodReducer,
    categoryReducer,
    deskReducer,
  },
});
