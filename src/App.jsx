import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import PrivateRoutes from "./components/PrivateRoutes"
import { AuthProvider } from "./context/AuthContext"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UpdateProfile from "./pages/UpdateProfile"

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route element={<PrivateRoutes />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='update-profile' element={<UpdateProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
