import React, { useState } from 'react'
import API from '../../services/api'
import { useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import FrontImg from '../../assets/Front.jpg'
import DefaultInput from '../../component/Form/DefaultInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import Toast from '../../component/Toast/Toast'

const Registation = () => {
    const navigate = useNavigate()
    const { values, handleChange } = useForm({
        username: '',
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false);

    const headleRegistaion = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {

            const res = await API.post('/register', values)

            if (res.data.success === true) {
                setToast({ success: true, message: res.data.message });

                setTimeout(() => {
                    navigate('/')
                }, 3000)
            }
            else {
                setToast({ success: false, message: res.data.message });
            }

        } catch (err) {
            console.log(err)
        } finally {
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
                        Smart Pharmacy Management System for efficient, secure and modern healthcare operations.
                    </p>

                    <div className="mt-8 h-px w-24 bg-white/40" />

                    <p className="mt-6 text-xs tracking-[0.4em] uppercase text-white/60">
                        Precision • Care • Trust
                    </p>

                </div>

            </div>

            <div className="w-full xl:w-1/2 bg-white relative flex items-center justify-center px-10">

                <div className="absolute top-6 right-8">
                    <a
                        href="/"
                        className="text-gray-900 font-medium hover:text-black transition-colors duration-300"
                    >
                        Login →
                    </a>
                </div>


                <div className="w-full max-w-lg text-gray-700 space-y-6">

                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome to <span className="text-black">Drug for You</span>
                        </h1>
                        <p className="text-sm text-gray-500">
                            Create your account to access the Pharmacy Management System
                        </p>
                    </div>

                    <form method="post" onSubmit={headleRegistaion} className="space-y-5">

                        <div>
                            <DefaultInput
                                label="Enter Username"
                                name={'username'}
                                value={values.username}
                                placeholder="Username"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <DefaultInput
                                type="email"
                                label="Enter Email Address"
                                name={'email'}
                                value={values.email}
                                placeholder="username@example.com"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <DefaultInput
                                type="password"
                                label="Enter Password"
                                name={'password'}
                                value={values.password}
                                placeholder="********"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pt-2">
                            <DefaultButton
                                type="submit"
                                label={loading ? 'Creating Account...' : 'Create Account'}
                            />
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Registation