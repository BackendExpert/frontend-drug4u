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
import Medicines from '../pages/dashboard/medicines/Medicines'
import CreateMedicine from '../pages/dashboard/medicines/CreateMedicine'
import ViewMedicine from '../pages/dashboard/medicines/ViewMedicine'
import ViewMedicines from '../pages/dashboard/viewMedicines/ViewMedicines'
import ViewOneMedicine from '../pages/dashboard/viewMedicines/ViewOneMedicine'
import MyPurchase from '../pages/my/MyPurchase'
import Notifications from '../pages/dashboard/notifications/Notifications'
import Reports from '../pages/dashboard/reports/Reports'
import ViewUser from '../pages/dashboard/users/ViewUser'


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
                    <Route path='my-purchase' element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><MyPurchase /></PrivateRoute>} />
                
                    {/* user management */}
                    <Route path='users' element={<PrivateRoute roles={['super_admin']} ><Users /></PrivateRoute>} />
                    <Route path='user/:email' element={<PrivateRoute roles={['super_admin']} ><ViewUser /></PrivateRoute>} />
                

                    {/* pharmacist */}
                    <Route path='patients' element={<PrivateRoute roles={['super_admin', 'pharmacist']} ><Patients /></PrivateRoute>} />
                    <Route path='patient/:id' element={<PrivateRoute roles={['super_admin', 'pharmacist']} ><ViewPatient /></PrivateRoute>} />

                    {/* Medicne */}
                    <Route path='medicines' element={<PrivateRoute roles={['super_admin', 'pharmacist']} ><Medicines /></PrivateRoute>} />
                    <Route path='medicine/create' element={<PrivateRoute roles={['super_admin', 'pharmacist']} ><CreateMedicine /></PrivateRoute>} />
                    <Route path='medicine/view/:id' element={<PrivateRoute roles={['super_admin', 'pharmacist']} ><ViewMedicine /></PrivateRoute>} />

                    {/* online shop */}
                    <Route path='view-medicines' element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><ViewMedicines /></PrivateRoute>} />
                    <Route path='view-one-medicines/:id' element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><ViewOneMedicine /></PrivateRoute>} />

                    {/* notifications */}
                    <Route path='notifications' element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><Notifications /></PrivateRoute>} />

                    {/* reports */}
                    <Route path='reports' element={<PrivateRoute roles={['super_admin', 'customer', 'pharmacist']} ><Reports /></PrivateRoute>} />


                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
