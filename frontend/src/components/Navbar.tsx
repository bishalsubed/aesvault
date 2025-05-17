import { LogIn, LogOut, UserPlus, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { useUserStore } from "@/stores/useUserStore"

const Navbar = () => {

    const { user, logout } = useUserStore();

    return (
        <header className="bg-slate-800 text-white fixed top-0 right-0 w-full shadow-lg  border-b-2 border-b-green-600 z-50">
            <div className="md:container mx-auto md:px-4 py-3">
                <div className="flex flex-col md:flex-row gap-3 flex-wrap md:justify-between items-center">
                    <Link to='/' className='text-2xl font-bold items-center flex'>
                        <span className="text-green-400">&lt;</span>
                        AES
                        <span className="text-green-400">Vault /&gt;</span>
                    </Link>
                    <div className="border-t-2 border-gray-500 w-full md:hidden"></div>
                    <nav className="flex flex-wrap justify-between items-center gap-4">
                        {user ? (
                            <>
                            <Link
                                to={"/dashboard"}
                                className='bg-green-600 hover:bg-green-700 py-[10px] px-2
                                rounded-md flex transition duration-300 ease-in-out'
                            >
                                <Home size={18} />
                            </Link>
                            <Link
                                to={"/change-password"}
                                className='bg-green-600 hover:bg-green-700 py-2 px-3 
                                rounded-md flex items-center transition duration-300 ease-in-out'
                            >
                                Change Password
                            </Link>
                            <button
                                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out'
                                onClick={logout}
                            >
                                <LogOut size={18} />
                                <span className='hidden sm:inline ml-2'>Log Out</span>
                            </button>
                        </>
                        ) : (
                            <>
                                <Link
                                    to={"/signup"}
                                    className='bg-green-500 hover:bg-green-600 py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
                                >
                                    <UserPlus className='mr-2' size={18} />
                                    Sign Up
                                </Link>
                                <Link
                                    to={"/login"}
                                    className='bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'
                                >
                                    <LogIn className='mr-2' size={18} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar