import { configureStore } from "@reduxjs/toolkit";
import floorReducer from "./floor/floorSlice";
import foodReducer from "./food/foodSlice";
import categoryReducer from './category/categorySlice';
import userReducer from './auth/authSlice';



// luu tru toan bo du lieu cua app
// dung de tao ra trang thai ban dau
export default configureStore({
  reducer: {
    userReducer,
    floorReducer,
    foodReducer,
    categoryReducer,
  },
});
