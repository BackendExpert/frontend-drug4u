import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaPen } from 'react-icons/fa6'

const Users = () => {

    const [users, setUsers] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {

        const fetchallusers = async () => {

            const res = await API.get('users/fetch-all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setUsers(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchallusers()

    }, [token])

    return (
        <div className="space-y-5">

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <h1 className="text-lg font-semibold text-gray-800">
                    Manage Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View and manage all registered users
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
                                    Username
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">

                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                users.length > 0 ? (
                                    users.map((data, index) => {
                                        return (

                                            <tr
                                                key={index}
                                                className="transition hover:bg-gray-50"
                                            >

                                                <td className="px-6 py-4 font-medium text-gray-700">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white">
                                                            {data.username?.charAt(0)}
                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-gray-800">
                                                                {data.username}
                                                            </p>

                                                            <p className="text-sm text-gray-500">
                                                                User Account
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.email}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
                                                        {data.role}
                                                    </span>

                                                </td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href={`/dashboard/user/${data.email}`}
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                                        View
                                                    </a>
                                                </td>

                                            </tr>

                                        )
                                    })
                                ) : (
                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="px-6 py-10 text-center text-sm font-medium text-gray-500"
                                        >
                                            No users found
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
                    users.length > 0 ? (
                        users.map((data, index) => {
                            return (

                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white">
                                                {data.username?.charAt(0)}
                                            </div>

                                            <div>

                                                <h2 className="font-semibold text-gray-800">
                                                    {data.username}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    {data.email}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-4 flex items-center justify-between">

                                        <span className="text-sm font-medium text-gray-500">
                                            Role
                                        </span>

                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
                                            {data.role}
                                        </span>

                                    </div>

                                </div>

                            )
                        })
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm font-medium text-gray-500 shadow-sm">
                            No users found
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Users