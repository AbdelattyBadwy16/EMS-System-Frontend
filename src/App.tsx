import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import StudentHome from "./pages/StudentHome"
import AppLayout from "./components/shared/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import PersistLogin from "./helper/PersistLogin"
import RequireAuth from "./helper/RequireAuth"
import FacultyHome from "./pages/FacultyHome"
import ObserverHome from "./pages/ObserverHome"
import { HelmetProvider } from "react-helmet-async"
import AddCommitte from "./pages/AddCommitte"
import ResetPassword from "./pages/ResetPassword"
import GlobalAdmin from "./pages/GlobalAdmin"
import Colleges from "./pages/Colleges"
import ChangePassword from "./pages/Changepassword"
import Info from "./pages/info"
import CommiteStudents from "./pages/CommiteStudents"
const helmetContext = {};

function App() {

  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Routes>
          {/*public Routes */}
          <Route index element={<Login></Login>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path='/resetPassword' element={<ResetPassword></ResetPassword>}></Route>
          {/*Private Routes */}
          <Route element={<PersistLogin></PersistLogin>}>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route element={<AppLayout></AppLayout>}>
                <Route path='/studenthome' element={<StudentHome></StudentHome>}></Route>
                <Route path='/facultyhome' element={<FacultyHome></FacultyHome>}></Route>
                <Route path='/staffhome' element={<ObserverHome></ObserverHome>}></Route>
                <Route path='/addCommitte' element={<AddCommitte></AddCommitte>}></Route>
                <Route path='/changepassword' element={<ChangePassword></ChangePassword>}></Route>
                <Route path='/globaladmin' element={<GlobalAdmin></GlobalAdmin>}></Route>
                <Route path='/colleges' element={<Colleges></Colleges>}></Route>
                <Route path='/commite' element={<Info></Info>}></Route>
                <Route path='/allstudents' element={<CommiteStudents></CommiteStudents>}></Route>
                <Route path='*' element={<PageNotFound />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
