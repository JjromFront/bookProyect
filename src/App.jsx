import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./pages/auth/login"
import { Main } from "./pages/Main";
import { Register } from "./pages/auth/Register";
import { Admin } from "./pages/Admin"
import { User } from "./pages/User";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/user" element={<User />}/>
        </Routes>
      </Router>

  )
}

export default App;