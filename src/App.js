import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import SignInSide from "./pages/auth/signIn";
import ListUser from "./pages/user/list/List";
import NewUser from "./pages/user/new/New";
import ListFood from "./pages/food/list/List.jsx";
import EditUser from "./pages/user/edit/Edit";
import EditFood from "./pages/food/edit/Edit";
import NewFood from "./pages/food/new/New";
import NewCategory from "./pages/category/new/New";
import EditCategory from "./pages/category/edit/Edit";
import ListCategory from "./pages/category/list/List";
import ListDesk from "./pages/desk/list/List.jsx";
import NewDesk from "./pages/desk/new/New.jsx";
import EditDesk from "./pages/desk/edit/Edit.jsx";
import ListBooking from "./pages/booking/List.jsx";
import ListInvoice from "./pages/invoice/list/List.jsx";
import NewInvoice from "./pages/invoice/new/New.jsx";
import AddFoodToInvoiceDetail from "./pages/invoice/addFoodToInvoice/AddFoodToInvoice.jsx";
import CustomerHome from "./pages/customer/Customer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser, isAuthenticated } from "./store/auth/authSlice.js";
import Unauthorized from "./Unauthorized.js";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const isAuthenticate = useSelector(isAuthenticated);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [token, dispatch]);

  let authorities;
  if (user.authorities && user.authorities.length > 0) {
    authorities = user?.authorities[0]?.authority;
  } else {
    console.log("Không có quyền được tìm thấy");
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          z
          <Route path="signin" element={<SignInSide />} />
          <Route path="/">
            {/* Admin Route*/}
            {authorities === "ROLE_ADMIN" && (
              <>
                <Route index element={<Home />} />
                <Route path="users">
                  <Route index element={<ListUser />} />
                  <Route path="new" element={<NewUser title="Thêm mới" />} />
                  <Route
                    path="edit/:id"
                    element={<EditUser title="Chỉnh sửa" />}
                  />
                </Route>
                <Route path="foods">
                  <Route index element={<ListFood />} />
                  <Route path="new" element={<NewFood title="Thêm mới" />} />
                  <Route
                    path="edit/:id"
                    element={<EditFood title="Chỉnh sửa" />}
                  />
                </Route>
                <Route path="categories">
                  <Route index element={<ListCategory />} />
                  <Route
                    path="new"
                    element={<NewCategory title="Thêm mới" />}
                  />
                  <Route
                    path="edit/:id"
                    element={<EditCategory title="Chỉnh sửa" />}
                  />
                </Route>
                <Route path="desks">
                  <Route index element={<ListDesk />} />
                  <Route path="new" element={<NewDesk title="Thêm mới" />} />
                  <Route
                    path="edit/:id"
                    element={<EditDesk title="Chỉnh sửa" />}
                  />
                </Route>
              </>
            )}

            {/* Cashier Route */}
            {authorities === "ROLE_CASHIER" && (
              <>
                <Route path="bookings">
                  <Route index element={<ListBooking />} />
                </Route>
                <Route path="invoices">
                  <Route index element={<ListInvoice />} />
                  <Route
                    path="new"
                    element={<NewInvoice title="Thêm mới hóa đơn" />}
                  />
                  <Route
                    path="addFoodToInvoice/:id"
                    element={<AddFoodToInvoiceDetail title="Gọi món" />}
                  />
                </Route>

                <Route path="home">
                  <Route index element={<CustomerHome />} />
                </Route>
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
