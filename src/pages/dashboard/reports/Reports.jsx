import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const Reports = () => {
    const [users, setUsers] = useState([])
    const [medicine, setMedicine] = useState([])
    const [notifications, setNotifications] = useState([])

    const token = localStorage.getItem('token')

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

    const downloadCSV = (data, filename) => {
        if (!data || data.length === 0) return

        const headers = Object.keys(data[0]).join(',')
        const rows = data.map(item =>
            Object.values(item).map(v => `"${v ?? ''}"`).join(',')
        )

        const csv = [headers, ...rows].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = `${filename}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return (
        <div className="p-8 space-y-5">

            <div className="bg-white flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition">
                <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-800">Users Report</span>
                    <span className="text-xs text-gray-400">Download all registered users data</span>
                </div>
                <button
                    onClick={() => downloadCSV(users, 'users_report')}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    Download
                </button>
            </div>

            <div className="bg-white flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition">
                <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-800">Medicine Report</span>
                    <span className="text-xs text-gray-400">Download all medicine inventory data</span>
                </div>
                <button
                    onClick={() => downloadCSV(medicine, 'medicine_report')}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    Download
                </button>
            </div>

            <div className="bg-white flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition">
                <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-800">Notifications Report</span>
                    <span className="text-xs text-gray-400">Download system notification logs</span>
                </div>
                <button
                    onClick={() => downloadCSV(notifications, 'notifications_report')}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                    Download
                </button>
            </div>

        </div>
    )
}

export default Reports