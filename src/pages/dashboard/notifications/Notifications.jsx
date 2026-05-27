import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchnotifications = async () => {
            const res = await API.get('medicine/fetch-notifications', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setNotifications(res.data.result)
            } else {
                console.log(res.data.message)
            }
        }

        if (token) fetchnotifications()
    }, [token])

    return (
        <div className="space-y-5">

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <h1 className="text-lg font-semibold text-gray-800">
                    Notifications
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View all system notifications
                </p>
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">

                <div className="overflow-x-auto">

                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    #
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Type
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Notification
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                notifications.length > 0 ? (
                                    notifications.map((data, index) => {
                                        return (

                                            <tr
                                                key={index}
                                                className="transition hover:bg-gray-50"
                                            >

                                                <td className="px-6 py-4 font-medium text-gray-700">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                                        {data.type_notification}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-gray-700">
                                                    {data.notification}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.create_at}
                                                </td>

                                            </tr>

                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-10 text-center text-sm font-medium text-gray-500"
                                        >
                                            No notifications found
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <div className="grid gap-4 md:hidden">

                {
                    notifications.length > 0 ? (
                        notifications.map((data, index) => {
                            return (

                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                                {data.type_notification}
                                            </span>

                                            <p className="mt-2 font-semibold text-gray-800">
                                                {data.notification}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-4 flex items-center justify-between">

                                        <span className="text-sm font-medium text-gray-500">
                                            Date
                                        </span>

                                        <span className="text-xs font-semibold text-gray-700">
                                            {data.create_at}
                                        </span>

                                    </div>

                                </div>

                            )
                        })
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm font-medium text-gray-500 shadow-sm">
                            No notifications found
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Notifications