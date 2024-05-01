import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import StudentHome from "./pages/StudentHome"
import AppLayout from "./components/shared/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import PersistLogin from "./helper/PersistLogin"
import RequireAuth from "./helper/RequireAuth"
import FacultyHome from "./components/FacultyHome/FacultyHome"
import ObserverHome from "./pages/ObserverHome"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/*public Routes */}

        <Route index element={<Login></Login>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        {/*Private Routes */}

        <Route element={<PersistLogin></PersistLogin>}>
          <Route element={<RequireAuth></RequireAuth>}>
            <Route element={<AppLayout></AppLayout>}>
              <Route path='/studenthome' element={<StudentHome></StudentHome>}></Route>
              <Route path='/facultyhome' element={<FacultyHome></FacultyHome>}></Route>
              <Route path='/staffhome' element={<ObserverHome></ObserverHome>}></Route>
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
