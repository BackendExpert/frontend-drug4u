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
import Unauthorized from './Unauthorized'
import DashHome from '../pages/dashboard/DashHome'
import Users from '../pages/dashboard/users/Users'
import MyProfile from '../pages/my/MyProfile'
import Patients from '../pages/dashboard/patients/Patients'
import ViewPatient from '../pages/dashboard/patients/ViewPatient'


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
                    <Route path='/unauthorized' element={<Unauthorized />} />
                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><DashError /></PrivateRoute>} />
                    <Route index element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><DashHome /></PrivateRoute>} />
                    
                    {/* profile managment - moslty for custormers */}
                    <Route path='profile' element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><MyProfile /></PrivateRoute>} />
                
                    {/* user management */}
                    <Route path='users' element={<PrivateRoute roles={['super_admin']} ><Users /></PrivateRoute>} />

                    {/* pharmacist */}

                    <Route path='patients' element={<PrivateRoute roles={['super_admin', 'pharmacist']} ><Patients /></PrivateRoute>} />
                    <Route path='patient/:id' element={<PrivateRoute roles={['super_admin', 'pharmacist']} ><ViewPatient /></PrivateRoute>} />


                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
