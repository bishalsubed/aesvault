
import { useParams, useNavigate } from "react-router-dom"
import { useCredentialStore } from "@/stores/useCredentialsStore"
import { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeOff, Link, Loader, Lock, Mail, SquarePen, Trash, ChevronLeft } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
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
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { Button } from "@/components/ui/button";

const CredentialPage = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [updatedCredential, setUpdatedCredential] = useState({
        account: "",
        password: "",
        websiteUrl: "",
    })
    const navigate = useNavigate()
    const { credential, deleteCredential, getCredentialById, updateCredential, loading } = useCredentialStore();

    const { credentialId } = useParams();

    useEffect(() => {
        if (credentialId) {
            getCredentialById(credentialId)
        }
    }, [credentialId])

    useEffect(() => {
        if (credential) {
            setUpdatedCredential({
                account: credential.account || "",
                password: credential.password || "",
                websiteUrl: credential.websiteUrl || "",
            });
        }
    }, [credential]);

    const passwordRef = useRef<HTMLInputElement>(null)

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

        setUpdatedCredential((prev) => ({...prev, password:password}))
}


    if (!credential) <LoadingSpinner />

    return (
        <div className="min-h-screen">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4">
                <ChevronLeft className="h-4 w-4" />
                Back
            </Button>
            <h1 className="text-2xl text-green-700 text-center font-medium underline underline-offset-4 pb-6">{credential?.websiteUrl ? credential.websiteUrl.split("/")[2].split(".")[0].toUpperCase() || "Unknown" : "unknown"}</h1>
            <div className="flex justify-between items-center px-4 py-10">
                <div className="w-1/2">
                    <div
                        className='border-2 border-gray-200 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
                    >

                        <div className='space-y-8 relative'>
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
                                        value={updatedCredential.account}
                                        placeholder="example@example.com"
                                        onChange={(e) => setUpdatedCredential({ ...updatedCredential, account: e.target.value })}
                                        className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
						        placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
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
                                        value={updatedCredential.password}
                                        placeholder="******"
                                        onChange={(e) => setUpdatedCredential({ ...updatedCredential, password: e.target.value })}
                                        className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                                        {isPasswordVisible ? (<EyeIcon className="size-5 text-green-700" />) : (<EyeOff className="size-5 text-green-700" />)}
                                    </div>
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="absolute right-0 px-1 py-1 border border-transparent rounded-md 
					shadow-sm text-xs font-medium text-white bg-gray-600 hover:bg-green-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50">Generate Password</button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will temporarily replace your credential
                                                and changes your data in your display until updated.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={generateRobustPassword}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-green-700" htmlFor="email">Webiste Url</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Link className='h-5 w-5 text-green-700' aria-hidden='true' />
                                    </div>
                                    <input
                                        id="websiteUrl"
                                        type="url"
                                        required
                                        value={updatedCredential.websiteUrl}
                                        placeholder="https://example.com"
                                        onChange={(e) => setUpdatedCredential({ ...updatedCredential, websiteUrl: e.target.value })}
                                        className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
						        placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild><button
                                        type='submit'
                                        className='flex justify-center py-2 px-3 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50'
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
                                                Update Credential
                                            </>
                                        )}
                                    </button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently update your credential
                                                and changes your data in our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => updateCredential(credential._id, updatedCredential)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild><button
                                        type='submit'
                                        className='flex justify-center py-2 px-3 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50'
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <Trash className='mr-2 h-5 w-5' />
                                                Delete Credential
                                            </>
                                        )}
                                    </button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your credential
                                                and removes your data in our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction className="bg-red-500 text-white hover:bg-red-600" onClick={() => deleteCredential(credential._id)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex flex-col gap-1 border-2 border-gray-200 shadow-lg rounded-lg px-8 py-4 mb-8 max-w-xl mx-auto">
                        <div className="text-green-700 text-xl underline underline-offset-4">
                            Necessities For Robust Password
                        </div>
                        <PasswordStrengthMeter password={updatedCredential.password} />
                        <div className="font-medium mt-1">Basic Necessities :</div>
                        <ul className="list-disc pl-5 text-gray-600 italic text-sm mt-1">
                            <li>At least 12 characters long</li>
                            <li>Includes uppercase and lowercase letters</li>
                            <li>Contains numbers and special characters (@, #, $, etc.)</li>
                            <li>Avoids common words or phrases</li>
                            <li>Never reuse old passwords</li>
                        </ul>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CredentialPage