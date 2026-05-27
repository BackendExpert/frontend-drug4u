import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaPen } from 'react-icons/fa6'
import DefaultInput from '../../../component/Form/DefaultInput'


const Medicines = () => {

    const [medicine, setMedicine] = useState([])
    const [search, setSearch] = useState('')
    const [stockFilter, setStockFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    
    const token = localStorage.getItem('token')

    useEffect(() => {

        const fetchallmedicine = async () => {

            const res = await API.get('medicine/fetch-all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setMedicine(
                    res.data.result
                        ? (Array.isArray(res.data.result) ? res.data.result : [res.data.result])
                        : []
                )
            }
        }

        if (token) fetchallmedicine()

    }, [token])

    const filteredData = medicine
        .filter(item =>
            item.name?.toLowerCase().includes(search.toLowerCase())
        )
        .filter(item =>
            stockFilter ? item.quantity <= Number(stockFilter) : true
        )

    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <div className="space-y-5">

            {/* HEADER */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <h1 className="text-lg font-semibold text-gray-800">
                    Manage Medicines
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View and manage all medicines
                </p>

                {/* INPUTS */}
                <div className="mt-4 grid md:grid-cols-2 gap-3">

                    <DefaultInput
                        name="search"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                    />

                    <DefaultInput
                        name="stock"
                        type="number"
                        placeholder="Stock less than..."
                        value={stockFilter}
                        onChange={(e) => {
                            setStockFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />

                </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">

                <div className="overflow-x-auto">

                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">#</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Medicine</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Qty</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Expiry</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">Age</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                paginatedData.length > 0 ? (
                                    paginatedData.map((data, index) => {

                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition">

                                                <td className="px-6 py-4 font-medium text-gray-700">
                                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white">
                                                            {data.name?.charAt(0)}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-gray-800">
                                                                {data.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Medicine Item
                                                            </p>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    LKR {data.price}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.quantity}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.expiry_date}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {data.age_restriction ? <span className='text-red-500 font-bold'>18+</span> : 'No'}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <a href={`/dashboard/medicine/view/${data.id}`}>
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
                                        <td colSpan={7} className="px-6 py-10 text-center text-sm text-gray-500">
                                            No medicines found
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>

                    </table>

                </div>
            </div>

            {/* MOBILE */}
            <div className="grid gap-4 md:hidden">

                {
                    paginatedData.length > 0 ? (
                        paginatedData.map((data, index) => (

                            <div
                                key={index}
                                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white">
                                            {data.name?.charAt(0)}
                                        </div>

                                        <div>
                                            <h2 className="font-semibold text-gray-800">
                                                {data.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                LKR {data.price}
                                            </p>
                                        </div>

                                    </div>

                                    <a href={`/dashboard/medicine/view/${data.id}`}>
                                        <button className="inline-flex items-center justify-center rounded-lg bg-black p-2 text-white hover:bg-gray-800 transition">
                                            <FaPen size={14} />
                                        </button>
                                    </a>

                                </div>

                                <div className="mt-4 space-y-2 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Qty</span>
                                        <span className="font-medium text-gray-700">
                                            {data.quantity}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Expiry</span>
                                        <span className="font-medium text-gray-700">
                                            {data.expiry_date}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Age</span>
                                        <span className="font-medium text-gray-700">
                                            {data.age_restriction ? <span>18+</span> : 'No'}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        ))
                    ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
                            No medicines found
                        </div>
                    )
                }

            </div>

            <div className="flex items-center justify-center gap-1 mt-4">

                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm text-gray-500 hover:text-black disabled:opacity-30"
                >
                    Prev
                </button>

                {
                    Array.from({ length: totalPages }, (_, i) => {
                        const page = i + 1

                        return (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 text-sm transition
                        ${currentPage === page
                                        ? 'text-black font-semibold underline underline-offset-4'
                                        : 'text-gray-400 hover:text-black'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    })
                }

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm text-gray-500 hover:text-black disabled:opacity-30"
                >
                    Next
                </button>

            </div>

        </div>
    )
}

export default Medicines