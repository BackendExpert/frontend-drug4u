import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../services/api'
import { FaPills } from 'react-icons/fa6'
import useForm from '../../../hooks/useForm'
import DefaultInput from '../../../component/Form/DefaultInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'


const ViewOneMedicine = () => {
    const { id } = useParams()
    const token = localStorage.getItem('token')
    const [medicine, setMedicine] = useState()

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        quantity: "",
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
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchmedicinebyid()
    }, [id, token])

    const headlePurchase = async (e) => {
        e.preventDefault();
        setLoading(true);

        const qty = Number(values.quantity);

        if (qty > 20) {
            setToast({ success: false, message: "Max purchase is 20" });
            setLoading(false);
            return;
        }

        if (qty <= 0) {
            setToast({ success: false, message: "Invalid quantity" });
            setLoading(false);
            return;
        }

        try {
            const res = await API.patch(`medicine/purchase/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (res.data.success === true) {
                setToast({ success: true, message: res.data.message });

                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                setToast({ success: false, message: res.data.message });
            }
        } catch (err) {
            console.log(err);
            setToast({ success: false, message: "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };


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

            <div className="md:flex justify-between">
                <div className="md:w-1/2 p-6 bg-white">
                    {medicine ? (
                        <div>
                            <div className="flex flex-col items-center justify-center mb-8">
                                <div className="text-orange-500">
                                    <FaPills className="h-16 w-16" />
                                </div>

                                <div className="mt-3 text-center">
                                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                                        {medicine.name}
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Medicine Details
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5 text-gray-800">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Price</span>
                                    <span className="font-medium">LKR {medicine.price}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Quantity</span>
                                    <span className="font-medium">{medicine.quantity}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Expiry Date</span>
                                    <span className="font-medium">{medicine.expiry_date}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Age Restriction</span>
                                    <span className="font-medium">
                                        {medicine.age_restriction ? <span className='text-red-500 font-bold'>Required (18+ recommended)</span> : "Not Required"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">Loading...</p>
                    )}
                </div>
                <div className="md:w-1/2 p-4 rounded shadow bg-white md:ml-2 md:mt-0 mt-4">
                    <div className="">
                        <h1 className="text-lg text-gray-500 font-semibold">Add Quantity You need </h1>
                        <p className="text-xs text-red-500">max is 20 par Medicine</p>
                    </div>

                    <div className="">
                        {
                            medicine && medicine.quantity < 10 ?
                                <div className="">
                                    <h1 className="text-center mt-5">Cannot Purchase <span className='text-red-500 font-bold'>Out of Stock</span></h1>
                                </div>
                                :
                                <div className="">
                                    <form onSubmit={headlePurchase} method="post">
                                        <div className="mt-8">
                                            <DefaultInput
                                                label={"Enter Quantity You need"}
                                                type='number'
                                                name={'quantity'}
                                                value={values.quantity}
                                                placeholder={"max is 20"}
                                                required
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="">
                                            <DefaultButton
                                                type='submit'
                                                label={loading ? 'Purchasing...' : 'Purchase Medicine'}
                                            />
                                        </div>
                                    </form>
                                </div>
                        }

                    </div>
                </div>
            </div>
            <div className="p-4 bg-white mt-4">
                {medicine && (
                    <div className="space-y-3">
                        <h3 className="text-sm text-gray-900 tracking-wide text-red-500 font-bold">
                            Important Information
                        </h3>

                        <div className="text-sm text-gray-600 space-y-2">
                            <p>
                                • This medicine expires on{" "}
                                <span className="font-medium text-gray-900">
                                    {medicine.expiry_date}
                                </span>
                            </p>

                            <p>
                                • The maximum purchase <span className='text-red-500 font-bold'>limit of 20</span> items per medicine
                            </p>

                            <p>
                                • Age restriction:{" "}
                                <span className="font-medium text-gray-900">
                                    {medicine.age_restriction ? <span className='text-red-500 font-bold'>Required (18+ recommended)</span> : "No restriction"}
                                </span>
                            </p>

                            <p className="text-gray-500">
                                Please ensure proper usage and consult guidelines before dispensing.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewOneMedicine