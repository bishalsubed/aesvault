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
            const allChars =  smallAlphabets + CapitalAlphabets + numbers + specialCharacters;
    
            let password = "";
            for(let i=0; i<12; i++){
                const randomIndex = Math.floor(Math.random() * allChars.length);
                password += allChars.charAt(randomIndex);
            }
    
            setNewPassword(password);
    }
    const handleChangePassword = ()=> {
        changePassword({ oldPassword, newPassword })
        setOldPassword("")
        setNewPassword("")
    }
    return (
        <div className="min-h-screen">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mt-16 md:mt-4">
                <ChevronLeft className="h-4 w-4" />
                Back
            </Button>
            <h1 className="text-2xl text-green-700 text-center font-medium underline underline-offset-4 pb-6">Change Password</h1>
            <div className="flex justify-between items-center px-4 py-10">
                <div className="w-full">
                    <div
                        className='border-2 border-gray-200 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
                    >
                        <div className='space-y-8 relative'>
                            <div className="">
                                <label className="block text-sm font-medium text-green-700" htmlFor="password">Old Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-green-700' aria-hidden='true' />
                                    </div>
                                    <input
                                        id="password"
                                        ref={passwordRef1}
                                        type="password"
                                        required
                                        value={oldPassword}
                                        placeholder="******"
                                        onChange={(e) => setOldPassword(e.target.value )}
                                        className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility1}>
                                        {isPasswordVisible ? (<EyeIcon className="size-5 text-green-700" />) : (<EyeOff className="size-5 text-green-700" />)}
                                    </div>
                                </div>
                                
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-green-700" htmlFor="password">New Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-green-700' aria-hidden='true' />
                                    </div>
                                    <input
                                        id="password"
                                        ref={passwordRef}
                                        type="password"
                                        required
                                        value={newPassword}
                                        placeholder="******"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                        {isPasswordVisible ? (<EyeIcon className="size-5 text-green-700" />) : (<EyeOff className="size-5 text-green-700" />)}
                                    </div>
                                </div>
                                        <button className="absolute right-0 px-1 py-1 border border-transparent rounded-md 
					shadow-sm text-xs font-medium text-white bg-gray-600 hover:bg-green-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50" onClick={generateRobustPassword}>Generate Password</button>
                            </div>
                            <div className="flex items-center justify-end">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild><button
                                        type='submit'
                                        className='flex justify-center py-2 px-3 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 mt-5'
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <SquarePen className='mr-2 h-5 w-5' />
                                                Update Password
                                            </>
                                        )}
                                    </button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently update your password
                                                and changes your data in our servers. Please make sure you have saved this password somewhere safe.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleChangePassword() }>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordPage