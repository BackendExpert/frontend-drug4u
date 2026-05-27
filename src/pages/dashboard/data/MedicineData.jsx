import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../../services/api'


const MedicineData = () => {
    const [medicine, setMedicine] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchallmedicine = async () => {
            try {
                const res = await API.get('medicine/fetch-all', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (res.data.success) {
                    setMedicine(Array.isArray(res.data.result) ? res.data.result : [])
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (token) fetchallmedicine()
    }, [token])

    const total = medicine.length

    const adultCount = medicine.filter(m => m.age_restriction === 1).length
    const normalCount = medicine.filter(m => m.age_restriction === 0).length

    const adultPercent = total ? (adultCount / total) * 100 : 0
    const normalPercent = total ? (normalCount / total) * 100 : 0

    return (
        <div className="p-6 bg-white text-black">
            <div className="mb-10">
                <div className="flex justify-between mb-2">
                    <span className="text-sm">18+ Medicines</span>
                    <span className="text-sm">{adultCount} / {total} ({adultPercent.toFixed(1)}%)</span>
                </div>

                <div className="h-1 bg-gray-200 overflow-hidden">
                    <div
                        className="h-1 bg-black transition-all duration-1000 ease-out"
                        style={{ width: `${adultPercent}%` }}
                    ></div>
                </div>
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <span className="text-sm">Normal Medicines</span>
                    <span className="text-sm">{normalCount} / {total} ({normalPercent.toFixed(1)}%)</span>
                </div>

                <div className="h-1 bg-gray-200 overflow-hidden">
                    <div
                        className="h-1 bg-black transition-all duration-1000 ease-out"
                        style={{ width: `${normalPercent}%` }}
                    ></div>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-white">
                    <div className="text-xs mb-2">TOTAL</div>
                    <div className="text-3xl">{total}</div>
                </div>

                <div className="bg-white">
                    <div className="text-xs mb-2">RESTRICTED</div>
                    <div className="text-3xl">{adultCount}</div>
                </div>
            </div>
        </div>
    )
}

export default MedicineData