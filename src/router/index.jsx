import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Dashboard/DashError'
import DashHome from '../pages/dashboard/DashHome'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<RequestLink />} />
                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><DashError /></PrivateRoute>} />
                
                    <Route index element={<PrivateRoute roles={['super_admin', 'plant_admin', 'engineer', 'viewer']} ><DashHome /></PrivateRoute> } />

                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App
