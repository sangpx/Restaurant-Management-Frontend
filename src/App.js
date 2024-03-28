import { BrowserRouter, Routes, Route } from "react-router-dom";
import { foodInputs } from "./utils/formSource";
import "./style/dark.scss";
import { useContext } from "react";
import Home from "./pages/home/Home";
import { DarkModeContext } from "./context/darkModeContext";
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


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<SignInSide />} />
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<ListUser />} />
              <Route path="new" element={<NewUser title="Thêm mới" />} />
              <Route path="edit/:id" element={<EditUser title="Chỉnh sửa" />} />
            </Route>
            <Route path="foods">
              <Route index element={<ListFood />} />
              <Route
                path="new"
                element={<NewFood title="Thêm mới" />}
              />
              <Route
                path="edit/:id"
                element={<EditFood title="Chỉnh sửa" />}
              />
            </Route>
            <Route path="categories">
              <Route index element={<ListCategory />} />
              <Route path="new" element={<NewCategory title="Thêm mới" />} />
              <Route
                path="edit/:id"
                element={<EditCategory title="Chỉnh sửa" />}
              />
            </Route>
            <Route path="desks">
              <Route index element={<ListDesk />} />
              <Route
                path="new"
                element={<NewDesk title="Thêm mới" />}
              />
              <Route
                path="edit/:id"
                element={<EditDesk title="Chỉnh sửa" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
