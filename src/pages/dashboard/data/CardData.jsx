import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaUsers, FaPills, FaBell } from 'react-icons/fa6'
import { useAuth } from '../../../context/AuthContext'

const CardData = () => {
    const [users, setUsers] = useState([])
    const [medicine, setMedicine] = useState([])
    const [notifications, setNotifications] = useState([])

    const { auth } = useAuth()
    const token = localStorage.getItem('token')
    const storedUser = JSON.parse(localStorage.getItem('user'))

    const role = auth?.user?.role || auth?.role || storedUser?.role

    useEffect(() => {
        const fetchallusers = async () => {
            const res = await API.get('users/fetch-all', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success) setUsers(res.data.result || [])
        }

        if (token) fetchallusers()
    }, [token])

    useEffect(() => {
        const fetchallmedicine = async () => {
            const res = await API.get('medicine/fetch-all', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success) {
                setMedicine(Array.isArray(res.data.result) ? res.data.result : [])
            }
        }

        if (token) fetchallmedicine()
    }, [token])

    useEffect(() => {
        const fetchnotifications = async () => {
            const res = await API.get('medicine/fetch-notifications', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success) setNotifications(res.data.result || [])
        }

        if (token) fetchnotifications()
    }, [token])

    const gridCols =
        role === 'super_admin'
            ? 'grid-cols-1 md:grid-cols-3'
            : role === 'pharmacist'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1'

    const cardData = [
        {
            id: 1,
            name: "Total Users",
            icon: FaUsers,
            count: users.length,
            subtitle: "Registered system users",
            roles: ['super_admin']
        },
        {
            id: 2,
            name: "Medicines",
            icon: FaPills,
            count: medicine.length,
            subtitle: "Available medicines",
            roles: ['super_admin', 'pharmacist', 'customer']
        },
        {
            id: 3,
            name: "Notifications",
            icon: FaBell,
            count: notifications.length,
            subtitle: "System alerts",
            roles: ['super_admin', 'pharmacist']
        },
    ]

    const filteredCards = role
        ? cardData.filter(card => card.roles.includes(role))
        : []

    return (
        <div className={`grid ${gridCols} gap-4`}>

            {filteredCards.map((card) => {
                const Icon = card.icon

                return (
                    <div
                        key={card.id}
                        className="bg-white p-6 hover:bg-gray-50 transition"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <div className="text-sm text-gray-500">
                                    {card.name}
                                </div>

                                <div className="text-2xl font-semibold text-gray-900">
                                    {card.count}
                                </div>

                                <div className="text-xs text-gray-400">
                                    {card.subtitle}
                                </div>
                            </div>

                            <div className="text-gray-700 text-xl">
                                <Icon />
                            </div>

                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default CardData