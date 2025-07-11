import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react";
import { EyeIcon, EyeOff, Loader, Lock, SquarePen, ChevronLeft } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";
const ChangePasswordPage = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const navigate = useNavigate()
    const { changePassword, loading } = useUserStore();


    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordRef1 = useRef<HTMLInputElement>(null)

    const togglePasswordVisibility = () => {
        if (passwordRef.current) {
            if (passwordRef.current.type == "password") {
                passwordRef.current.type = "text"
            } else {
                passwordRef.current.type = "password"
            }
        }
        setIsPasswordVisible(!isPasswordVisible)
    }

    const togglePasswordVisibility1 = () => {
        if (passwordRef1.current) {
            if (passwordRef1.current.type == "password") {
                passwordRef1.current.type = "text"
            } else {
                passwordRef1.current.type = "password"
            }
        }
        setIsPasswordVisible1(!isPasswordVisible1)
    }

    const generateRobustPassword = () => {
        const smallAlphabets = "abcdefghijklmnopqrstuvwxyz";
        const CapitalAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const specialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        const allChars = smallAlphabets + CapitalAlphabets + numbers + specialCharacters;

        let password = "";
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars.charAt(randomIndex);
        }

        setNewPassword(password);
    }
    const handleChangePassword = () => {
        changePassword({ oldPassword, newPassword })
        setOldPassword("")
        setNewPassword("")
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-2xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 text-sm flex items-center gap-1 text-gray-600 hover:text-green-700"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </Button>

                <h1 className="text-3xl font-bold text-center text-green-700 underline underline-offset-4 mb-8">
                    Change Password
                </h1>

                <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-8 space-y-10">
                    <div className="space-y-2">
                        <label htmlFor="oldPassword" className="text-sm font-medium text-green-800">
                            Old Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-green-600" />
                            </div>
                            <input
                                id="oldPassword"
                                ref={passwordRef1}
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                value={oldPassword}
                                placeholder="Enter your current password"
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-green-50 text-sm placeholder-gray-500 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-600"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility1}
                            >
                                {isPasswordVisible ? (
                                    <EyeIcon className="h-5 w-5 text-green-600" />
                                ) : (
                                    <EyeOff className="h-5 w-5 text-green-600" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="newPassword" className="text-sm font-medium text-green-800">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-green-600" />
                            </div>
                            <input
                                id="newPassword"
                                ref={passwordRef}
                                type={isPasswordVisible ? "text" : "password"}
                                required
                                value={newPassword}
                                placeholder="Create a new password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-green-50 text-sm placeholder-gray-500 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-600"
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
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={generateRobustPassword}
                                className="text-xs font-medium text-white bg-gray-700 hover:bg-green-700 px-3 py-1 rounded-md transition"
                            >
                                Generate Password
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader className="h-5 w-5 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <SquarePen className="h-5 w-5" />
                                            Update Password
                                        </>
                                    )}
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will update your password. Make sure to store the new password safely.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleChangePassword}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangePasswordPage