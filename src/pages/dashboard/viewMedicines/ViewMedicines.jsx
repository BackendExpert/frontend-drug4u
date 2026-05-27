import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../services/api'
import {
    FaPills,
    FaChevronLeft,
    FaChevronRight,
    FaMagnifyingGlass
} from 'react-icons/fa6'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const ViewMedicines = () => {

    const [medicine, setMedicine] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('best')
    const [outOfStock, setOutOfStock] = useState(false)

    const token = localStorage.getItem('token')

    const ITEMS_PER_PAGE = 20

    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {

        const fetchmedicine = async () => {

            try {

                const res = await API.get('medicine/fetch-all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                if (res.data.success === true) {

                    setMedicine(
                        res.data.result
                            ? (
                                Array.isArray(res.data.result)
                                    ? res.data.result
                                    : [res.data.result]
                            )
                            : []
                    )

                } else {
                    console.log(res.data.message)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchmedicine()
        }

    }, [token])

    // FILTER + SEARCH + SORT
    const filteredMedicines = useMemo(() => {

        let filtered = [...medicine]

        // SEARCH
        if (search.trim() !== '') {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        // OUT OF STOCK
        if (outOfStock) {
            filtered = filtered.filter((item) => item.quantity === 0)
        }

        // SORT
        if (sort === 'low') {
            filtered.sort((a, b) => Number(a.price) - Number(b.price))
        }

        if (sort === 'high') {
            filtered.sort((a, b) => Number(b.price) - Number(a.price))
        }

        return filtered

    }, [medicine, search, sort, outOfStock])

    const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE)

    const paginatedMedicines = useMemo(() => {

        const start = (currentPage - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE

        return filteredMedicines.slice(start, end)

    }, [filteredMedicines, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [search, sort, outOfStock])

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    return (
        <div className="w-full">

            {/* Header */}
            <div className="bg-white p-6 mb-5 shadow-sm">

                <div className="flex items-center justify-between flex-wrap gap-4">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Medicines
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Browse all Medicines in the Pharmacy
                        </p>
                    </div>

                    <div className="bg-gray-100 px-5 py-3">
                        <p className="text-xs text-gray-500">
                            Total Medicines
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900">
                            {filteredMedicines.length}
                        </h2>
                    </div>

                </div>

            </div>

            {/* Filters */}
            <div className="bg-white p-4 mb-5 shadow-sm">

                <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">

                    {/* Search */}
                    <div className="bg-gray-100 px-4 h-14 flex items-center gap-3">

                        <FaMagnifyingGlass className="text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search medicine by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none w-full text-sm text-gray-700"
                        />

                    </div>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="bg-gray-100 px-4 h-14 outline-none text-sm text-gray-700"
                    >
                        <option value="best">
                            Best Match
                        </option>

                        <option value="low">
                            Lowest Price First
                        </option>

                        <option value="high">
                            Highest Price First
                        </option>
                    </select>

                    {/* Out of stock */}
                    <button
                        onClick={() => setOutOfStock(!outOfStock)}
                        className={`
                            h-14 px-5 text-sm font-medium transition-all
                            ${outOfStock
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700'
                            }
                        `}
                    >
                        {
                            outOfStock
                                ? 'Showing Out Of Stock'
                                : 'Out Of Stock Only'
                        }
                    </button>

                </div>

            </div>

            {/* Loading */}
            {
                loading && (
                    <div className="bg-white p-10 flex items-center justify-center">
                        <div className="animate-pulse text-gray-500">
                            Loading Medicines...
                        </div>
                    </div>
                )
            }

            {/* Empty */}
            {
                !loading && filteredMedicines.length === 0 && (
                    <div className="bg-white p-14 flex flex-col items-center justify-center">

                        <FaPills className="text-gray-300 text-6xl mb-4" />

                        <h2 className="text-xl font-semibold text-gray-700">
                            No Medicines Found
                        </h2>

                        <p className="text-sm text-gray-400 mt-2">
                            Try changing search or filters
                        </p>

                    </div>
                )
            }

            {/* Cards */}
            {
                !loading && filteredMedicines.length > 0 && (
                    <>
                        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">

                            {
                                paginatedMedicines.map((data, index) => {

                                    const expired =
                                        new Date(data.expiry_date) < new Date()

                                    return (
                                        <div
                                            className="bg-white p-5 shadow-sm hover:shadow-xl transition-all duration-300 group"
                                            key={index}
                                        >

                                            {/* Top */}
                                            <div className="flex items-start justify-between">

                                                <div className="bg-gray-100 p-4 group-hover:scale-110 transition-all duration-300">
                                                    <FaPills className='text-3xl text-gray-800' />
                                                </div>

                                                <div
                                                    className={`px-3 py-1 text-xs font-semibold
                                                    ${expired
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-green-100 text-green-700'
                                                        }`}
                                                >
                                                    {expired ? 'Expired' : 'Available'}
                                                </div>

                                            </div>

                                            {/* Name */}
                                            <div className="mt-5">

                                                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                                                    {data.name}
                                                </h2>

                                            </div>

                                            {/* Price + Qty */}
                                            <div className="grid grid-cols-2 gap-3 mt-5">

                                                <div className="bg-gray-50 p-3">
                                                    <p className="text-xs text-gray-400">
                                                        Price
                                                    </p>

                                                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                                                        Rs. {data.price}
                                                    </h3>
                                                </div>

                                                <div className="bg-gray-50 p-3">
                                                    <p className="text-xs text-gray-400">
                                                        Quantity
                                                    </p>

                                                    <h3 className={`text-lg font-bold mt-1
                                                        ${data.quantity === 0
                                                            ? 'text-red-500'
                                                            : 'text-gray-900'
                                                        }
                                                    `}>
                                                        {data.quantity}
                                                    </h3>
                                                </div>

                                            </div>

                                            {/* Expiry */}
                                            <div className="bg-gray-50 p-3 mt-4">

                                                <p className="text-xs text-gray-400">
                                                    Expiry Date
                                                </p>

                                                <h3 className="text-sm font-semibold text-gray-800 mt-1">
                                                    {data.expiry_date}
                                                </h3>

                                            </div>

                                            {/* Age Restriction */}
                                            <div className="mt-4 flex items-center justify-between">

                                                <span className="text-sm text-gray-500">
                                                    Age Restriction
                                                </span>

                                                <span
                                                    className={`text-xs font-semibold px-3 py-1
                                                    ${data.age_restriction === 1
                                                            ? 'bg-orange-100 text-orange-600'
                                                            : 'bg-blue-100 text-blue-600'
                                                        }`}
                                                >
                                                    {
                                                        data.age_restriction === 1
                                                            ? '18+ Only'
                                                            : 'No Restriction'
                                                    }
                                                </span>

                                            </div>

                                            <div className="mt-4">
                                                <a href={`/dashboard/view-one-medicines/${data.id}`}>
                                                    <DefaultButton 
                                                        type='button'
                                                        label='View More'
                                                    />
                                                </a>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                        {/* Pagination */}
                        <div className="bg-white mt-6 p-5 shadow-sm">

                            <div className="flex items-center justify-between flex-wrap gap-4">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Page {currentPage} of {totalPages || 1}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">

                                    <button
                                        onClick={handlePrev}
                                        disabled={currentPage === 1}
                                        className="h-11 w-11 bg-gray-100 flex items-center justify-center disabled:opacity-40 transition-all"
                                    >
                                        <FaChevronLeft />
                                    </button>

                                    {
                                        [...Array(totalPages)].map((_, index) => {

                                            const page = index + 1

                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`
                                                        h-11 w-11 text-sm font-semibold transition-all
                                                        ${currentPage === page
                                                            ? 'bg-black text-white'
                                                            : 'bg-gray-100 text-gray-700'
                                                        }
                                                    `}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        })
                                    }

                                    <button
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages}
                                        className="h-11 w-11 bg-gray-100 flex items-center justify-center disabled:opacity-40 transition-all"
                                    >
                                        <FaChevronRight />
                                    </button>

                                </div>

                            </div>

                        </div>
                    </>
                )
            }

        </div>
    )
}

export default ViewMedicines