import { BrowserRouter,Routes,Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Tasks from "./pages/Tasks"
import Navbar from "./components/NavBar";

function App(){
  return(
    <>
    <BrowserRouter>
    <Navbar/>
    
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )

}
export default App