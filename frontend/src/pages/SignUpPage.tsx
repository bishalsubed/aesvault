import { ArrowRight, EyeIcon, EyeOff, Loader, Lock, Mail, User, UserPlus } from "lucide-react"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";


const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const passwordRef = useRef<HTMLInputElement>(null)

    const { signup, loading } = useUserStore();

    const togglePasswordVisibility = () => {
        if (passwordRef.current) {
            if (passwordRef.current.type == "password") {
                passwordRef.current.type = "text"
            } else {
                passwordRef.current.type = "password"
            }
            setIsPasswordVisible(!isPasswordVisible)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signup(formData)
        setFormData({ username: "", email: "", password: "", confirmPassword: "" })
        navigate("/login")
    }

    return (
        <div className="flex flex-col justify-center mt-20 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 via-white to-green-100">
            <h2 className="sm:mx-auto sm:w-full sm:max-w-md text-center text-3xl font-extrabold text-green-700">
                Create Your Account
            </h2>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white/80 backdrop-blur-lg border border-green-100 shadow-md rounded-xl px-6 sm:px-10 py-10">
                <form method="POST" onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-green-700">Full Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-green-600" />
                            </div>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="eg. John Doe"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="block w-full rounded-md border border-green-200 bg-green-50 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-green-600 focus:ring-green-500 sm:text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-green-700">Email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-green-600" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="example@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="block w-full rounded-md border border-green-200 bg-green-50 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-green-600 focus:ring-green-500 sm:text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-green-700">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-green-600" />
                            </div>
                            <input
                                id="password"
                                type={isPasswordVisible ? 'text' : 'password'}
                                ref={passwordRef}
                                required
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="block w-full rounded-md border border-green-200 bg-green-50 py-2 pl-10 pr-10 text-gray-900 placeholder-gray-500 focus:border-green-600 focus:ring-green-500 sm:text-sm outline-none"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <EyeIcon className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-green-600" />}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-green-700">Confirm Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-green-600" />
                            </div>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                placeholder="Enter password again"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="block w-full rounded-md border border-green-200 bg-green-50 py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-green-600 focus:ring-green-500 sm:text-sm outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader className="mr-2 h-5 w-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <UserPlus className="mr-2 h-5 w-5" />
                                Sign Up
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-700">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:text-green-500 underline underline-offset-2 font-medium">
                        Login here <ArrowRight className="inline h-4 w-4" />
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default SignUpPage