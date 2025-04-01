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
        <div className="flex flex-col justify-center py-8 sm:px-6 lg:px-8">
            <h2 className="sm:mx-auto sm:w-full sm:max-w-md mt-6 text-3xl font-bold text-center text-green-600">Login To Your Account</h2>
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md py-7 px-3 sm:rounded-lg sm:px-10 border-2 shadow-sm">
                <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                    <div>
                        <label className="block text-sm font-medium text-green-700" htmlFor="email">Email</label>
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
						        placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                            />
                        </div>
                    </div>
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
                                placeholder="******"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? (<EyeIcon className="size-5 text-green-700" />) : (<EyeOff className="size-5 text-green-700" />)}
                            </div>
                        </div>
                        <Link to={"/forgot-password/"} className="text-sm flex justify-end text-green-600 cursor-pointer items-en mt-1 underline underline-offset-2">Forgot Password?</Link>
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
                                <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                                LogIn
                            </>
                        )}
                    </button>
                </form>
                <p className='mt-8 text-center text-sm text-gray-700'>
                    Don&apos;t have an account?{" "}
                    <Link to='/signup' className='font-medium underline underline-offset-2 text-green-600 hover:text-green-500'>
                        SignUp here <ArrowRight className='inline h-4 w-4' />
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage