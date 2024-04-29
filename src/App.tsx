import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import StudentHome from "./pages/StudentHome"
import AppLayout from "./components/shared/AppLayout"
import PageNotFound from "./pages/PageNotFound"
<<<<<<< HEAD
import FacultyHome from "./components/FacultyHome/FacultyHome"
import FacultyFlowcharts from "./components/FacultyHome/FacultyFlowcharts"
=======
import PersistLogin from "./helper/PersistLogin"
import ObserverHome from "./pages/ObserverHome"

>>>>>>> 65937b0afe7d35ad858b61e1a91234472e7c0661

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
          <Route element={<AppLayout></AppLayout>}>
<<<<<<< HEAD
            <Route path='/studenthome' element={<StudentHome></StudentHome>}></Route>
            <Route path='/facultyHome' element={<FacultyHome></FacultyHome>}></Route>
            <Route path='/FacultyFlowcharts' element={<FacultyFlowcharts></FacultyFlowcharts>}></Route>
            <Route path='*' element={<PageNotFound />} />
=======
            <Route element={<PersistLogin></PersistLogin>}>
              <Route path='/studenthome' element={<StudentHome></StudentHome>}></Route>
              <Route path='*' element={<PageNotFound />} />
            </Route>
>>>>>>> 65937b0afe7d35ad858b61e1a91234472e7c0661
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
