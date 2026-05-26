import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import useForm from '../../hooks/useForm'
import UserImg from '../../assets/User.png'
import { useAuth } from '../../context/AuthContext'
import DefaultInput from '../../component/Form/DefaultInput'
import DateInput from '../../component/Form/DateInput'
import TextAreaInput from '../../component/Form/TextAreaInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import Toast from '../../component/Toast/Toast'


const MyProfile = () => {
    const [mydata, setMydata] = useState("")
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false);
    const { auth } = useAuth()

    useEffect(() => {
        const fetchmydata = async () => {
            const res = await API.get('customer/get-my-customer-data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setMydata(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchmydata()
    }, [token])

    const { values, handleChange } = useForm({
        fullname: "",
        address: "",
        date_of_birth: "",
        age: ""
    })

    const headleUpdateCustomerData = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (
            values.full_name === '' &&
            values.address === '' &&
            values.date_of_birth === '' &&
            values.age === ''
        ) {
            setToast({
                success: false,
                message: "At least one input field is required"
            });

            setLoading(false);
            return;
        }

        try {
            const res = await API.patch('customer/update-customer-data', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setToast({ success: true, message: res.data.message });
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
            else {
                setToast({ success: false, message: res.data.message });
            }
        }
        catch (err) {
            console.log(err)
        }
        finally {
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

            return val.split(",").map(item => item.trim()).filter(Boolean)
        }

        return []
    }

    return (
        <div className="w-full">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="flex flex-col lg:flex-row gap-6">

                <div className="lg:w-1/2 bg-white p-6">

                    {/* HEADER */}
                    <div className="flex items-center gap-5">

                        <div className="relative">
                            <img
                                src={UserImg}
                                className="h-24 w-24 object-cover"
                            />

                            <span className="absolute bottom-1 right-1 h-3 w-3 bg-green-500"></span>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                                {auth?.username}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {auth?.email}
                            </p>

                            <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-indigo-600">
                                {auth?.role}
                            </span>
                        </div>

                    </div>


                    <div className="my-6 h-px bg-gray-200"></div>


                    <div className="space-y-6">

                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-[3px] text-gray-400 mb-4">
                                Customer Profile
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">

                                <div>
                                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                        Full Name
                                    </p>

                                    <p className="text-[15px] font-medium text-gray-800">
                                        {mydata?.full_name || '-'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                        Age
                                    </p>

                                    <p className="text-[15px] font-medium text-gray-800">
                                        {mydata?.age || '-'}
                                    </p>
                                </div>

                                <div className="sm:col-span-2">
                                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                        Address
                                    </p>

                                    <p className="text-[15px] font-medium text-gray-800 leading-relaxed">
                                        {mydata?.address || '-'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                        Date of Birth
                                    </p>

                                    <p className="text-[15px] font-medium text-gray-800">
                                        {mydata?.date_of_birth || '-'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                        Status
                                    </p>

                                    <p className="text-[15px] font-medium text-green-600">
                                        Active
                                    </p>
                                </div>

                            </div>
                        </div>


                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-[3px] text-gray-400 mb-4">
                                Health Information
                            </h2>

                            <div className="space-y-5">

                                <div>
                                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                        Allergies
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {toArray(mydata?.allergies).length > 0 ? (
                                            toArray(mydata?.allergies).map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50"
                                                >
                                                    {item}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-[15px] font-medium text-gray-800">None</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                        Medical Conditions
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {toArray(mydata?.medical_conditions).length > 0 ? (
                                            toArray(mydata?.medical_conditions).map((item, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50"
                                                >
                                                    {item}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-[15px] font-medium text-gray-800">None</p>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                <div className="lg:w-1/2 bg-white p-6">
                    <div className="">
                        <h1 className="text-xl font-semibold text-gray-500">Update Customer Data</h1>
                        <p className="text-xs mt-1 text-gray-500">Update your customer data</p>
                    </div>

                    <form onSubmit={headleUpdateCustomerData} method="post">
                        <div className="mt-4">
                            <DefaultInput
                                label={"Enter Full Name"}
                                name={'full_name'}
                                value={values.full_name}
                                placeholder={"Full Name"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <TextAreaInput
                                label={"Enter Address"}
                                name={'address'}
                                value={values.address}
                                placeholder='88, Cross Street, Your City, Your Postal Code'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <DateInput
                                label={"Select Data of Birth"}
                                name={'date_of_birth'}
                                value={values.date_of_birth}
                                minDate="1940-01-01"
                                maxDate="2020-12-31"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <DefaultInput
                                label={"Enter You Age"}
                                type='number'
                                name={'age'}
                                value={values.age}
                                placeholder={"25"}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="">
                            <DefaultButton
                                type='submit'
                                label={loading ? 'Updating Data...' : 'Update My Data'}
                            />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )

}

export default MyProfile