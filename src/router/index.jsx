import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Dashboard/DashError'
import Registation from '../pages/auth/Registation'
import DefultError from '../component/Errors/DefultError'
import Login from '../pages/auth/Login'
import ForgetPassword from '../pages/auth/ForgetPassword'
import ResetPassword from '../pages/auth/ResetPassword'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<Login />} />
                    <Route path='/registation' element={<Registation />} />
                    <Route path='/forget-password' element={<ForgetPassword />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><DashError /></PrivateRoute>} />

                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
