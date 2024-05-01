import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import StudentHome from "./pages/StudentHome"
import AppLayout from "./components/shared/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import FacultyHome from "./components/FacultyHome/FacultyHome"
import FacultyFlowcharts from "./components/FacultyHome/FacultyFlowcharts"
import PersistLogin from "./helper/PersistLogin"
import Pass from "./pages/changepassword"
import ObserverHome from "./pages/ObserverHome"
import AddCommitte from "./pages/AddCommitte"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/*public Routes */}
        <Route>
          <Route index element={<Login></Login>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Route>
        {/*Private Routes */}
        <Route>
          <Route element={<PersistLogin></PersistLogin>}>
            <Route element={<AppLayout></AppLayout>}>
              <Route path='/studenthome' element={<StudentHome></StudentHome>}></Route>
              <Route path='/observerhome' element={<ObserverHome></ObserverHome>}></Route>
              <Route path='/addcommitte' element={<AddCommitte></AddCommitte>}></Route>
              <Route path='*' element={<PageNotFound />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
