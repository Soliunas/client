import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from "./layout/PublicLayout";
import { UserLayout } from "./layout/UserLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Users } from "./pages/users/Users";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { AdminMeistraiTypes } from "./pages/meistras-types/AdminMeistraiTypes";
import { AdminNewMeistrasType } from "./pages/meistras-types/AdminNewMeistrasType";
import { AdminEditMeistrasType } from "./pages/meistras-types/AdminEditMeistrasType";


function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/meistras-types" element={<AdminMeistraiTypes />}></Route>
            <Route path="/meistras-types/new" element={<AdminNewMeistrasType />}></Route>
            <Route
              path="/meistras-types/:meistrasType/edit"
              element={<AdminEditMeistrasType />}
            ></Route>
            <Route path="/users" element={<Users />}></Route>
            {/* <Route path="/meistrai" element={<Meistrai />}></Route>
            <Route path="/meistrai/new" element={<AddMeistras />}></Route>
            <Route path="/meistrai/:meistrasId/edit" element={<EditMeistras />}></Route> */}
          </Route>
          <Route Component={PublicLayout}>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  )
}

export default App;