import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaPen } from 'react-icons/fa6'
import { Search } from 'lucide-react'

const Patients = () => {

    const [patients, setPatients] = useState([])
    const [search, setSearch] = useState('')
    const token = localStorage.getItem('token')

    useEffect(() => {

        const fetchpatients = async () => {

            const res = await API.get('customer/fetch-all-customers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setPatients(
                    res.data.result
                        ? (Array.isArray(res.data.result) ? res.data.result : [res.data.result])
                        : []
                )
            } else {
                console.log(res.data.message)
            }
        }

        if (token) fetchpatients()

    }, [token])

    const filteredPatients = patients.filter((p) =>
        p.full_name?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-5">

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <h1 className="text-lg font-semibold text-gray-800">
                    Manage Patients
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View and manage all patients
                </p>

                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Search by full name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">

                <div className="overflow-x-auto">

                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">#</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Patient</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Address</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">DOB</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Age</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                filteredPatients.length > 0 ? (
                                    filteredPatients.map((data, index) => {

                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition">

                                                <td className="px-6 py-4 font-medium text-gray-700">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white">
                                                            {data.full_name?.charAt(0)}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-gray-800">
                                                                {data.full_name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Patient Record
                                                            </p>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.address}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.date_of_birth}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.age}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <a href={`/dashboard/patient/${data.id}`}>
                                                        <button className="inline-flex items-center justify-center rounded-lg bg-black p-2 text-white hover:bg-gray-800 transition">
                                                            <FaPen size={14} />
                                                        </button>
                                                    </a>
                                                </td>

                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                                            No patients found
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
                    filteredPatients.length > 0 ? (
                        filteredPatients.map((data, index) => {

                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white">
                                                {data.full_name?.charAt(0)}
                                            </div>

                                            <div>
                                                <h2 className="font-semibold text-gray-800">
                                                    {data.full_name}
                                                </h2>
                                                <p className="text-sm text-gray-500">
                                                    {data.address}
                                                </p>
                                            </div>

                                        </div>

                                        <a href={`/dashboard/patient/${data.id}`}>
                                            <button className="inline-flex items-center justify-center rounded-lg bg-black p-2 text-white hover:bg-gray-800 transition">
                                                <FaPen size={14} />
                                            </button>
                                        </a>

                                    </div>

                                    <div className="mt-4 space-y-2 text-sm">

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">DOB</span>
                                            <span className="font-medium text-gray-700">
                                                {data.date_of_birth}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Age</span>
                                            <span className="font-medium text-gray-700">
                                                {data.age}
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
                            No patients found
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Patients