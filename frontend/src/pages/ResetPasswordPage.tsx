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
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-green-100 px-8 py-10 sm:p-12">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-green-700 tracking-tight">Reset Your Password</h1>
                    <p className="mt-2 text-sm text-gray-500">Choose a strong new password</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-green-800 mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-green-600" />
                            </div>
                            <input
                                id="password"
                                ref={passwordRef}
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                value={formData.password}
                                placeholder="Enter new password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-green-50 text-sm placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <EyeIcon className="h-5 w-5 text-green-600" />
                                ) : (
                                    <EyeOff className="h-5 w-5 text-green-600" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-green-800 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-green-600" />
                            </div>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                placeholder="Re-enter password"
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full pl-10 py-2 rounded-lg border border-gray-300 bg-green-50 text-sm placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader className="h-5 w-5 animate-spin" />
                                <span>Updating...</span>
                            </>
                        ) : (
                            <>
                                <SquarePen className="h-5 w-5" />
                                <span>Change Password</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage