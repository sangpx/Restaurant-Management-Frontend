import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { foodInputs, userInputs } from "./utils/formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import SignInSide from "./pages/auth/SignIn";
import ListUser from "./pages/user/list/List";
import NewUser from "./pages/user/new/New";
import ListFood from "./pages/food/list/List";
import EditUser from "./pages/user/edit/Edit";
import EditFood from "./pages/food/edit/Edit";
import NewFood from "./pages/food/new/New";
import NewCategory from "./pages/category/new/New";
import EditCategory from "./pages/category/edit/Edit";
import ListCategory from "./pages/category/list/List";
import ListFloor from "./pages/Floor/list/List";
import NewFloor from "./pages/Floor/new/New";
import EditFloor from "./pages/Floor/edit/Edit";

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
              <Route path="edit" element={<EditUser title="Chỉnh sửa" />} />
            </Route>
            <Route path="foods">
              <Route index element={<ListFood />} />
              <Route
                path="new"
                element={<NewFood inputs={foodInputs} title="Thêm mới" />}
              />
              <Route
                path="edit"
                element={<EditFood inputs={foodInputs} title="Chỉnh sửa" />}
              />
            </Route>
            <Route path="categories">
              <Route index element={<ListCategory />} />
              <Route
                path="new"
                element={<NewCategory inputs={foodInputs} title="Thêm mới" />}
              />
              <Route
                path="edit"
                element={<EditCategory inputs={foodInputs} title="Chỉnh sửa" />}
              />
            </Route>
            <Route path="floors">
              <Route index element={<ListFloor />} />
              <Route
                path="new"
                element={<NewFloor inputs={foodInputs} title="Thêm mới" />}
              />
              <Route
                path="edit"
                element={<EditFloor inputs={foodInputs} title="Chỉnh sửa" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
