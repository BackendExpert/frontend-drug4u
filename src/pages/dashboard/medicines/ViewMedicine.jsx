import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../services/api'
import useForm from '../../../hooks/useForm'
import Toast from '../../../component/Toast/Toast'
import DefaultInput from '../../../component/Form/DefaultInput'
import DateInput from '../../../component/Form/DateInput'
import CheckboxInput from '../../../component/Form/CheckboxInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const ViewMedicine = () => {
    const { id } = useParams()
    const [medicine, setMedicine] = useState('')
    const token = localStorage.getItem('token')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)

    const { values, handleChange } = useForm({
        price: "",
        quantity: "",
        expiry_date: "",
        age_restriction: false,
    })

    useEffect(() => {
        const fetchmedicinebyid = async () => {
            const res = await API.get(`medicine/fetch-byid/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setMedicine(res.data.result)

                handleChange({
                    target: {
                        name: 'price',
                        value: res.data.result.price
                    }
                })

                handleChange({
                    target: {
                        name: 'quantity',
                        value: res.data.result.quantity
                    }
                })

                handleChange({
                    target: {
                        name: 'expiry_date',
                        value: res.data.result.expiry_date
                    }
                })

                handleChange({
                    target: {
                        name: 'age_restriction',
                        type: 'checkbox',
                        checked: !!res.data.result.age_restriction
                    }
                })
            }
        }

        if (token) fetchmedicinebyid()
    }, [id, token])

    const headleUpdateMedicineData = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                ...values,
                age_restriction: values.age_restriction ? 1 : 0
            }

            const res = await API.patch(`medicine/update-byid/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setToast({ success: true, message: res.data.message })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
            else {
                setToast({ success: false, message: res.data.message })
            }
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="md:flex justify-between">
                <div className="md:w-1/2 p-6 bg-white">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Medicine Details
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Complete information overview
                        </p>
                    </div>

                    <div className="divide-y divide-gray-100">
                        <div className="py-4 flex justify-between items-center">
                            <span className="text-sm text-gray-400">Name</span>
                            <span className="text-base text-gray-900 font-medium">
                                {medicine?.name}
                            </span>
                        </div>

                        <div className="py-4 flex justify-between items-center">
                            <span className="text-sm text-gray-400">Price</span>
                            <span className="text-base text-gray-900 font-medium">
                                Rs. {medicine?.price}
                            </span>
                        </div>

                        <div className="py-4 flex justify-between items-center">
                            <span className="text-sm text-gray-400">Quantity</span>
                            <span className="text-base text-gray-900 font-medium">
                                {medicine?.quantity}
                            </span>
                        </div>

                        <div className="py-4 flex justify-between items-center">
                            <span className="text-sm text-gray-400">Expiry Date</span>
                            <span className="text-base text-gray-900 font-medium">
                                {medicine?.expiry_date}
                            </span>
                        </div>

                        <div className="py-4 flex justify-between items-center">
                            <span className="text-sm text-gray-400">Age Restriction</span>
                            <span className="text-base text-gray-900 font-medium">
                                {medicine?.age_restriction ? (
                                    <div className="text-red-500 font-semibold">18+</div>
                                ) : (
                                    <div>None</div>
                                )}
                            </span>
                        </div>

                        <div className="py-4 flex justify-between items-center">
                            <span className="text-sm text-gray-400">Created</span>
                            <span className="text-xs text-gray-500">
                                {medicine?.created_at}
                            </span>
                        </div>

                        <div className="py-4 flex justify-between items-center">
                            <span className="text-sm text-gray-400">Last Update</span>
                            <span className="text-xs text-gray-500">
                                {medicine?.updated_at}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 p-4 bg-white rounded shadow md:ml-2 md:mt-0 mt-4">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            Medicine Details Update
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Update Medicine Details
                        </p>
                    </div>

                    <div className="mt-4">
                        <form onSubmit={headleUpdateMedicineData}>
                            <DefaultInput
                                label={"Enter Price of Medicine"}
                                name={'price'}
                                value={values.price}
                                placeholder={"85.00"}
                                onChange={handleChange}
                            />

                            <DefaultInput
                                label={"Enter Quantity of Medicine"}
                                name={'quantity'}
                                value={values.quantity}
                                placeholder={"85.00"}
                                onChange={handleChange}
                            />

                            <DateInput
                                label={"Enter Expire Data"}
                                name={'expiry_date'}
                                value={values.expiry_date}
                                minDate={new Date(new Date().setMonth(new Date().getMonth() + 5)).toISOString().split("T")[0]}
                                onChange={handleChange}
                            />

                            <CheckboxInput
                                label={"Age Restriction (18+ only)"}
                                name={'age_restriction'}
                                checked={values.age_restriction}
                                onChange={handleChange}
                            />

                            <div className="mt-8">
                                <DefaultButton
                                    type='submit'
                                    label={loading ? 'Updating...' : 'Update Medicine'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMedicine