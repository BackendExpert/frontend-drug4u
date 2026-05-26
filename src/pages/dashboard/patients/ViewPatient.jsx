import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import API from '../../../services/api'
import useForm from '../../../hooks/useForm'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const ViewPatient = () => {
    const { id } = useParams()
    const [patient, setPatient] = useState()
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [initLoaded, setInitLoaded] = useState(false)

    useEffect(() => {
        const fetchpaient = async () => {
            const res = await API.get(`customer/fetch-customer/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setPatient(res.data.result)
            } else {
                console.log(res.data.message)
            }
        }

        if (token) fetchpaient()
    }, [token, id])

    const { values, handleChange } = useForm({
        allergies: "",
        medical_conditions: "",
    })

    useEffect(() => {
        if (patient && !initLoaded) {

            const formatValue = (val) => {
                if (!val) return ""

                if (Array.isArray(val)) {
                    return val.join(", ")
                }

                if (typeof val === "string") {
                    try {
                        const parsed = JSON.parse(val)
                        if (Array.isArray(parsed)) {
                            return parsed.join(", ")
                        }
                    } catch (e) {
                        return val
                    }
                }

                return ""
            }

            handleChange({
                target: {
                    name: "allergies",
                    value: formatValue(patient.allergies)
                }
            })

            handleChange({
                target: {
                    name: "medical_conditions",
                    value: formatValue(patient.medical_conditions)
                }
            })

            setInitLoaded(true)
        }
    }, [patient, initLoaded])

    const headleUpdateCustomerDataBypharmacist = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(`customer/update-pharmacist/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setToast({ success: true, message: res.data.message })
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            } else {
                setToast({ success: false, message: res.data.message })
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const toArray = (val) => {
        if (!val) return []

        if (Array.isArray(val)) return val

        if (typeof val === "string") {
            try {
                const parsed = JSON.parse(val)
                if (Array.isArray(parsed)) return parsed
            } catch (e) { }

            return val.split(",").map(item => item.trim())
        }

        return []
    }

    return (
        <div className="">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="flex justify-between">
                <div className="md:w-1/2 bg-white p-6 space-y-5">
                    <div>
                        <h2 className="text-xs uppercase tracking-widest text-gray-400">
                            Patient Information
                        </h2>
                        <h1 className="text-xl font-semibold text-gray-800 mt-1">
                            {patient?.full_name}
                        </h1>
                    </div>

                    <div className="space-y-3 text-sm text-gray-700">
                        <div>
                            <p className="text-gray-400 text-xs">Address</p>
                            <p>{patient?.address}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400 text-xs">Date of Birth</p>
                                <p>{patient?.date_of_birth}</p>
                            </div>

                            <div>
                                <p className="text-gray-400 text-xs">Age</p>
                                <p>{patient?.age} years</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-400 text-xs mb-2">Allergies</p>

                            <div className="flex flex-wrap gap-2">
                                {toArray(patient?.allergies).map((item, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50"
                                        >
                                            {item}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-gray-400 text-xs mb-2">Medical Conditions</p>

                            <div className="flex flex-wrap gap-2">
                                {toArray(patient?.medical_conditions).map((item, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50"
                                        >
                                            {item}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 bg-white rounded shadow p-4 md:ml-2 md:mt-0 mt-2">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-500">
                            Update Patient Data
                        </h1>
                        <p className="text-xs text-gray-500">
                            Update allergies and medical conditions of the Patient
                        </p>
                        <p className='mt-4'>
                            <span className="text-red-500 font-bold uppercase">Important:</span>
                            <span className="ml-2 text-gray-600">
                                Enter multiple values separated by commas (e.g. apple, banana, mango)
                            </span>
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={headleUpdateCustomerDataBypharmacist} method="post">
                            <TextAreaInput
                                label={"Enter Patient's Allergies"}
                                name={'allergies'}
                                value={values.allergies}
                                placeholder='Loratadine, Cetirizine etc.'
                                onChange={handleChange}
                            />

                            <TextAreaInput
                                label={"Enter Patient's Medical Conditions"}
                                name={'medical_conditions'}
                                value={values.medical_conditions}
                                placeholder='Medical Conditions of the User'
                                onChange={handleChange}
                            />

                            <DefaultButton
                                type='submit'
                                label={loading ? 'Updating User Info...' : 'Update User Information'}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPatient