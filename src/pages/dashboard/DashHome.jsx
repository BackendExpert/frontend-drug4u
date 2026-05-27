import React from 'react'
import { useAuth } from '../../context/AuthContext'
import CardData from './data/CardData';
import TimeCard from './data/TimeCard';
import TopMedicine from './data/TopMedicine';
import MedicineData from './data/MedicineData';

const DashHome = () => {
    const { auth } = useAuth()
    let dashtitle = '';

    if (auth.role === 'super_admin') {
        dashtitle = 'Super Admin';
    }
    else if (auth.role === 'pharmacist') {
        dashtitle = 'Pharmacist';
    }
    else if (auth.role === 'customer') {
        dashtitle = 'Customer';
    }
    return (
        <div>
            <h1 className="">
                {dashtitle} Dashboard
            </h1>

            <div className="md:flex justify-between">
                <div className="md:w-3/4 mt-4">
                    <div className="">
                        <CardData />
                    </div>
                    <div className="mt-4">
                        <TopMedicine />
                    </div>
                </div>
                <div className="md:w-1/4 mt-4 md:ml-4">
                    <div className="">
                        <TimeCard />
                    </div>
                    <div className="mt-4 ">
                        <MedicineData />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashHome