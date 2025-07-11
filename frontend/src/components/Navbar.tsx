import { LogIn, LogOut, UserPlus, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { useUserStore } from "@/stores/useUserStore"

const Navbar = () => {

    const { user, logout } = useUserStore();

    return (
        <header className="bg-slate-800 text-white fixed top-0 w-full z-50 shadow-md border-b border-green-600">
            <div className="max-w-screen-xl mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <Link to="/" className="text-2xl font-bold flex items-center tracking-wide">
                        <span className="text-green-400">&lt;</span>
                        AES
                        <span className="text-green-400">Vault /&gt;</span>
                    </Link>

                    <div className="md:hidden border-t border-gray-600" />

                    <nav className="flex flex-wrap gap-3 items-center justify-start md:justify-end text-sm font-medium">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md flex items-center transition"
                                >
                                    <Home size={18} />
                                </Link>
                                <Link
                                    to="/change-password"
                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
                                >
                                    Change Password
                                </Link>
                                <button
                                    onClick={logout}
                                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center transition"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden sm:inline ml-2">Log Out</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md flex items-center transition"
                                >
                                    <UserPlus className="mr-2" size={18} />
                                    Sign Up
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md flex items-center transition"
                                >
                                    <LogIn className="mr-2" size={18} />
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