import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import FrontImg from '../../assets/Front.jpg'
import DefaultButton from '../../component/Buttons/DefaultButton'
import DefaultInput from '../../component/Form/DefaultInput'

const ResetPassword = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(false)

    const { values, handleChange } = useForm({
        password: ''
    })

    useEffect(() => {
        if (!token) {
            navigate("/", { replace: true });
        }
    }, [token, navigate]);

    if (!token) return null;

    const headleRestPassword = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                token,
                password: values.password,
            }

            const res = await API.post('/reset-password', payload)

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                if (res.data.message === "Token expired") {
                    setToast({
                        success: false,
                        message: res.data.message,
                    });
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }

                setToast({
                    success: false,
                    message: res.data.message,
                });
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: "Something went wrong"
            });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen overflow-hidden">

            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="hidden xl:flex xl:w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${FrontImg})` }}
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 flex flex-col justify-center px-20 text-white">
                    <div className="inline-flex w-fit items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-[0.3em] uppercase">
                        Pharmacy System
                    </div>

                    <h1 className="mt-6 text-6xl font-black tracking-wide">
                        Drug for You
                    </h1>

                    <p className="mt-5 max-w-md text-sm leading-7 text-white/80">
                        Smart Pharmacy Management System
                    </p>
                </div>
            </div>

            <div className="w-full xl:w-1/2 bg-white flex items-center justify-center px-10">

                <div className="w-full max-w-lg space-y-6">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Reset Password
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Enter your new password
                        </p>
                    </div>

                    <form onSubmit={headleRestPassword} className="space-y-5">

                        <DefaultInput
                            type="password"
                            label="New Password"
                            name="password"
                            value={values.password}
                            placeholder={"**********"}
                            onChange={handleChange}
                            required
                        />

                        <DefaultButton
                            type="submit"
                            label={loading ? "Updating..." : "Reset Password"}
                        />

                    </form>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword