import React, { useEffect, useState } from 'react'
import API from '../../services/api'

const MyPurchase = () => {
    const [mypurchase, setMypurchase] = useState([])
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchmypurchase = async () => {
            try {
                setLoading(true)

                const res = await API.get('medicine/fetch-my-purchase', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                if (res.data.success === true) {
                    setMypurchase(res.data.result)
                } else {
                    console.log(res.data.message)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (token) fetchmypurchase()
    }, [token])

    return (
        <div className="p-6 ">
            <div className="space-y-3">

                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-lg font-semibold text-gray-800">My Purchases</h1>
                    <span className="text-sm text-gray-500">{mypurchase.length} items</span>
                </div>

                {
                    loading ? (
                        <div className="text-gray-500 text-sm">
                            Loading...
                        </div>
                    ) : mypurchase.length === 0 ? (
                        <div className="bg-white p-4 rounded text-gray-400">
                            No purchases found
                        </div>
                    ) : (
                        mypurchase.map((data, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded flex justify-between items-center shadow-sm hover:shadow transition"
                                >
                                    <div>
                                        <div className="font-medium text-gray-800">
                                            {data.medicne}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Qty: {data.quantity}
                                        </div>
                                    </div>

                                    <div className="text-right text-sm text-gray-500">
                                        {new Date(data.purchase_at).toLocaleString()}
                                    </div>
                                </div>
                            )
                        })
                    )
                }

            </div>
        </div>
    )
}

export default MyPurchase