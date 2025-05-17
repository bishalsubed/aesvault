import { useUserStore } from "@/stores/useUserStore"
import { EyeIcon, EyeOff, Loader, Lock, SquarePen } from "lucide-react"
import { useState, useRef } from "react"
import toast from "react-hot-toast"
import { useParams, useNavigate } from "react-router-dom"

const ForgotPasswordPage = () => {

    const { resetToken } = useParams()

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null);
    const { loading, resetPassword } = useUserStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setFormData({ password: "", confirmPassword: "" })
            return
        } else {
            if (resetToken) {
                const data = {
                    resetToken: resetToken,
                    password: formData.password
                }
                resetPassword(data)
                navigate("/login")
            }
        }
    }

    const togglePasswordVisibility = () => {
        if (passwordRef.current) {
            if (passwordRef.current?.type == "password") {
                passwordRef.current.type = "text";
            } else {
                passwordRef.current.type = "password"
            }
            setIsPasswordVisible(!isPasswordVisible)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center py-8 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-green-700 mb-4">Reset Password</h1>
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md py-7 px-3 sm:rounded-lg sm:px-10 border-2 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-green-700" htmlFor="password">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-green-700' aria-hidden='true' />
                            </div>
                            <input
                                id="password"
                                ref={passwordRef}
                                type="password"
                                required
                                value={formData.password}
                                placeholder="**********"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
                                                placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? (<EyeIcon className="size-5 text-green-700" />) : (<EyeOff className="size-5 text-green-700" />)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-green-700" htmlFor="password">Confirm Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-green-700' aria-hidden='true' />
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                placeholder="*********"
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
                                                placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                            />
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='w-full flex justify-center py-2 px-4 border border-transparent 
                                                rounded-md shadow-sm text-sm font-medium text-white bg-green-600
                                                hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                                                focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-50'
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                Loading...
                            </>
                        ) : (
                            <>
                                <SquarePen className='mr-2 h-5 w-5' aria-hidden='true' />
                                Change Password
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage