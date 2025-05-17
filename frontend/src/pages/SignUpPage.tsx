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
        <div className="flex flex-col justify-center mt-10 py-8 sm:px-6 lg:px-8">
            <h2 className="sm:mx-auto sm:w-full sm:max-w-md mt-6 text-center text-3xl font-bold text-green-600">Create Your Account</h2>
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md py-7 px-3 sm:rounded-lg sm:px-10 border-2 shadow-sm">
                <form method="POST" onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor="name" className="block test-sm font-medium text-green-700">Full Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <User className='h-5 w-5 text-green-700' aria-hidden='true' />
                            </div>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.username}
                                placeholder="eg. John Doe"
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-700 focus:outline-none focus:ring-green-500 focus:border-green-600 text-sm sm:text-base'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block test-sm font-medium text-green-700">Email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Mail className='h-5 w-5 text-green-700' aria-hidden='true' />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                placeholder="example@example.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-700 focus:outline-none focus:ring-green-500 focus:border-green-600 text-sm sm:text-base'
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block test-sm font-medium text-green-700">Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-green-700' aria-hidden='true' />
                            </div>
                            <input
                                id="password"
                                type="password"
                                ref={passwordRef}
                                required
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-700 focus:outline-none focus:ring-green-500 focus:border-green-600 text-sm sm:text-base'
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? (<EyeIcon className="size-5 text-green-700" />) : (<EyeOff className="size-5 text-green-700" />)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block test-sm font-medium text-green-700">Confirm Password</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-green-700' aria-hidden='true' />
                            </div>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                placeholder="Enter password again"
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-700 focus:outline-none focus:ring-green-500 focus:border-green-600 text-sm sm:text-base'
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
                                <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                                Sign up
                            </>
                        )}
                    </button>
                </form>
                <p className='mt-8 text-center text-sm text-gray-700'>
                    Already have an account?{" "}
                    <Link to='/login' className='font-medium text-green-600 hover:text-green-500 underline underline-offset-2'>
                        Login here <ArrowRight className='inline h-4 w-4' />
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage