import React, { useEffect, useState } from 'react'
import { FaPills } from 'react-icons/fa6'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import { useNavigate } from 'react-router-dom'

const TopMedicine = () => {
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

    const lastSix = medicine.slice(-6)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lastSix.map((data, index) => {
                const expired = new Date(data.expiry_date) < new Date()
                const isLast = index === 5

                if (isLast) {
                    return (
                        <div
                            key={index}
                            onClick={() => navigate('/dashboard/view-medicines')}
                            className="bg-black text-white p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:opacity-90 transition-all duration-300"
                        >
                            <FaPills className="text-5xl mb-3" />
                            <h2 className="text-xl font-bold">View All Medicines</h2>
                        </div>
                    )
                }

                return (
                    <div
                        key={index}
                        className="bg-white p-5 shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="bg-gray-100 p-4 group-hover:scale-110 transition-all duration-300">
                                <FaPills className="text-3xl text-gray-800" />
                            </div>

                            <div
                                className={`px-3 py-1 text-xs font-semibold ${
                                    expired
                                        ? 'bg-red-100 text-red-600'
                                        : 'bg-green-100 text-green-700'
                                }`}
                            >
                                {expired ? 'Expired' : 'Available'}
                            </div>
                        </div>

                        <div className="mt-5">
                            <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                                {data.name}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-5">
                            <div className="bg-gray-50 p-3">
                                <p className="text-xs text-gray-400">Price</p>
                                <h3 className="text-lg font-bold text-gray-900 mt-1">
                                    Rs. {data.price}
                                </h3>
                            </div>

                            <div className="bg-gray-50 p-3">
                                <p className="text-xs text-gray-400">Quantity</p>
                                <h3
                                    className={`text-lg font-bold mt-1 ${
                                        data.quantity === 0 ? 'text-red-500' : 'text-gray-900'
                                    }`}
                                >
                                    {data.quantity}
                                </h3>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 mt-4">
                            <p className="text-xs text-gray-400">Expiry Date</p>
                            <h3 className="text-sm font-semibold text-gray-800 mt-1">
                                {data.expiry_date}
                            </h3>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                Age Restriction
                            </span>

                            <span
                                className={`text-xs font-semibold px-3 py-1 ${
                                    data.age_restriction === 1
                                        ? 'bg-orange-100 text-orange-600'
                                        : 'bg-blue-100 text-blue-600'
                                }`}
                            >
                                {data.age_restriction === 1
                                    ? '18+ Only'
                                    : 'No Restriction'}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TopMedicine