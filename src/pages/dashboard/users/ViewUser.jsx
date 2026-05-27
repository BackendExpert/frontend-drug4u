import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../../services/api'
import useForm from '../../../hooks/useForm'
import Dropdown from '../../../component/Form/Dropdown'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'



const ViewUser = () => {
    const navigate = useNavigate()
    const { email } = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchallusers = async () => {
            const res = await API.get('users/fetch-all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                const foundUser = res.data.result.find(
                    (u) => u.email === email
                )
                setUser(foundUser || null)
            }
        }

        if (token && email) fetchallusers()
    }, [token, email])

    const { values, handleChange } = useForm({
        email: email,
        role: ""
    })

    const headleUpdateRole = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch('users/update-role', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setToast({ success: true, message: res.data.message })
                setTimeout(() => navigate('/dashboard/users'), 2000)
            } else {
                setToast({ success: false, message: res.data.message })
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="md:p-6 p-2 space-y-6">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="bg-white p-5">
                {user && (
                    <>
                        <div className="text-lg font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-sm text-gray-600">{user.role}</div>
                    </>
                )}
            </div>

            <div className="bg-white p-5">
                <form onSubmit={headleUpdateRole} className="space-y-4">

                    <Dropdown
                        label="Role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        options={[
                            { value: "super_admin", label: "Super Admin" },
                            { value: "pharmacist", label: "Pharmacist" },
                            { value: "customer", label: "Customer" }
                        ]}
                        required
                    />

                    <DefaultButton
                        type='submit'
                        label={loading ? 'Updating...' : 'Update Role'}
                    />

                </form>
            </div>

        </div>
    )
}

export default ViewUser