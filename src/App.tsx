import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import StudentHome from "./pages/StudentHome"
import AppLayout from "./components/shared/AppLayout"
import PageNotFound from "./pages/PageNotFound"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/*public Routes */}
        <Route>
          <Route path="/Login" element={<Login></Login>}></Route>
          {/*Private Routes */}
        </Route>
        <Route>
          <Route element={<AppLayout></AppLayout>}>
            <Route index element={<Navigate replace to="/Login" />} />
            <Route path='/studenthome' element={<StudentHome></StudentHome>}></Route>     
            <Route path='*' element={<PageNotFound />} />       
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
