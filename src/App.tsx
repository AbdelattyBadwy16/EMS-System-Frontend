import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import RequireAuth from "./helper/RequireAuth"
import StudentHome from "./pages/StudentHome"
import AppLayout from "./components/shared/AppLayout"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/*public Routes */}
        <Route>
          <Route path="/login" element={<Login></Login>}></Route>
          {/*Private Routes */}
        </Route>
        <Route element={<RequireAuth></RequireAuth>}>
          <Route element={<AppLayout></AppLayout>}>
            <Route index element={<Navigate replace to="/login" />} />
            <Route path='/studenthome' element={<StudentHome></StudentHome>}></Route>            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
