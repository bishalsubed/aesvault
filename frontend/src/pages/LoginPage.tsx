import { ArrowRight, EyeIcon, EyeOff, Loader, Lock, LogIn, Mail } from "lucide-react"
import { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const loading = false;

    const passwordRef = useRef<HTMLInputElement>(null)

    const { login } = useUserStore();

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
        login(formData)
        setFormData({ email: "", password: "" })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="text-center text-4xl font-extrabold text-green-700">Welcome Back</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Login to access your account
                    </p>
                </div>
                <div className="rounded-xl bg-white/70 backdrop-blur-md border border-green-100 px-8 py-10 shadow-xl">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-green-800">Email</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-green-600" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    placeholder="example@example.com"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full rounded-md border border-green-300 bg-green-50 pl-10 pr-3 py-2 text-sm placeholder-gray-500 shadow-sm focus:border-green-600 focus:ring-green-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-green-800">Password</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-green-600" />
                                </div>
                                <input
                                    id="password"
                                    ref={passwordRef}
                                    type={isPasswordVisible ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    placeholder="******"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="block w-full rounded-md border border-green-300 bg-green-50 pl-10 pr-10 py-2 text-sm placeholder-gray-500 shadow-sm focus:border-green-600 focus:ring-green-500 outline-none"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? (
                                        <EyeIcon className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-green-600" />
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end mt-1">
                                <Link to="/forgot-password/" className="text-sm text-green-600 hover:underline">Forgot Password?</Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <LogIn className="mr-2 h-5 w-5" />
                                    Log In
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-700">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="font-medium text-green-600 hover:text-green-500 underline underline-offset-2">
                            Sign up here <ArrowRight className="inline h-4 w-4" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default LoginPage