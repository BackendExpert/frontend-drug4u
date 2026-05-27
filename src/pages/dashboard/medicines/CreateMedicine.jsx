import React, { useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import DateInput from '../../../component/Form/DateInput'
import CheckboxInput from '../../../component/Form/CheckboxInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import { useNavigate } from 'react-router-dom'
import Toast from '../../../component/Toast/Toast'

const CreateMedicine = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        name: "",
        price: "",
        quantity: "",
        expiry_date: "",
        age_restriction: false,
    })

    const headleCreateMedicine = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('medicine/create', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.data.success === true) {
                setToast({ success: true, message: res.data.message });
                setTimeout(() => {
                    navigate('/dashboard/medicines')
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
                <div className="md:w-1/2 bg-white p-4 rounded shadow">
                    <div className="mb-4">
                        <h1 className="text-lg text-gray-500 font-semibold">Create New Medicine</h1>
                        <p className="text-xs text-gray-500">Fill the inputs for create new medicine</p>
                    </div>

                    <div className="">
                        <form onSubmit={headleCreateMedicine} method="post">
                            <div className="">
                                <DefaultInput
                                    label={"Enter Medicine Name"}
                                    name={'name'}
                                    value={values.name}
                                    placeholder={'Paracetamol, Ibuprofen, Naproxen, and Aspirin etc.'}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <DefaultInput
                                    label={"Enter Medicine Price"}
                                    type='number'
                                    name={'price'}
                                    value={values.price}
                                    placeholder={'55.50'}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <DefaultInput
                                    label={"Enter Medicine Quantity"}
                                    type='number'
                                    name={'quantity'}
                                    value={values.quantity}
                                    placeholder={'100'}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <DateInput
                                    label={"Enter Expiry Date"}
                                    name={'expiry_date'}
                                    value={values.expiry_date}
                                    required
                                    minDate={new Date(new Date().setMonth(new Date().getMonth() + 5)).toISOString().split("T")[0]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <CheckboxInput
                                    label={"Age Restriction (18+ only)"}
                                    name={'age_restriction'}
                                    checked={values.age_restriction}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="">
                                <DefaultButton
                                    type='submit'
                                    label={loading ? 'Creating...' : 'Create New Medicine'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="md:w-1/2 bg-white p-4 rounded shadow md:ml-4 md:mt-0 mt-4">
                    <div className="md:w-1/2 bg-white p-4">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Medicine Preview
                            </h2>
                            <p className="text-xs text-gray-500">
                                Live preview of the medicine you are creating
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                    Name
                                </p>
                                <p className="text-[15px] font-medium text-gray-800">
                                    {values.name || "Not set"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                    Price
                                </p>
                                <p className="text-[15px] font-medium text-gray-800">
                                    {values.price ? `LKR ${values.price}` : "Not set"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                    Quantity
                                </p>
                                <p className="text-[15px] font-medium text-gray-800">
                                    {values.quantity || "Not set"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                    Expiry Date
                                </p>
                                <p className="text-[15px] font-medium text-gray-800">
                                    {values.expiry_date || "Not set"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-1">
                                    Age Restriction
                                </p>
                                <p className="text-[15px] font-medium text-gray-800">
                                    {values.age_restriction ? "18+ Restricted" : "No restriction"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMedicine