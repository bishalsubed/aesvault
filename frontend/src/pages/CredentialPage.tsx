
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
        const allChars = smallAlphabets + CapitalAlphabets + numbers + specialCharacters;

        let password = "";
        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars.charAt(randomIndex);
        }

        setUpdatedCredential((prev) => ({ ...prev, password: password }))
    }


    if (!credential) <LoadingSpinner />

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 text-gray-600 hover:text-green-700 flex items-center gap-1"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </Button>

                <h1 className="text-3xl font-bold text-center text-green-700 underline underline-offset-4 mb-12">
                    {credential?.websiteUrl?.split("/")[2]?.split(".")[0]?.toUpperCase() || "UNKNOWN"}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 space-y-8">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-green-700">
                                Email
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-green-600" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={updatedCredential.account}
                                    placeholder="example@example.com"
                                    onChange={(e) =>
                                        setUpdatedCredential({ ...updatedCredential, account: e.target.value })
                                    }
                                    className="w-full pl-10 pr-3 py-2 bg-green-50 border rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-600 text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative">
                            <label className="block text-sm font-medium text-green-700" htmlFor="password">
                                Password
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-green-700" />
                                </div>
                                <input
                                    id="password"
                                    ref={passwordRef}
                                    type={isPasswordVisible ? "text" : "password"}
                                    required
                                    value={updatedCredential.password}
                                    placeholder="******"
                                    onChange={(e) =>
                                        setUpdatedCredential({ ...updatedCredential, password: e.target.value })
                                    }
                                    className="block w-full px-3 py-2 pl-10 pr-10 bg-green-50 border rounded-md shadow-sm
        placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600
        text-sm sm:text-base"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {isPasswordVisible ? (
                                        <EyeIcon className="size-5 text-green-700" />
                                    ) : (
                                        <EyeOff className="size-5 text-green-700" />
                                    )}
                                </div>
                            </div>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        type="button"
                                        className="mt-2 px-3 py-1.5 border border-transparent rounded-md shadow-sm 
        text-sm font-medium text-white bg-gray-600 hover:bg-green-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-[346px]"
                                    >
                                        Generate Password
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will temporarily replace your password in the field. Please copy/save if needed.
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
                            <label htmlFor="websiteUrl" className="block text-sm font-medium text-green-700">
                                Website URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Link className="h-5 w-5 text-green-600" />
                                </div>
                                <input
                                    id="websiteUrl"
                                    type="url"
                                    required
                                    value={updatedCredential.websiteUrl}
                                    placeholder="https://example.com"
                                    onChange={(e) =>
                                        setUpdatedCredential({ ...updatedCredential, websiteUrl: e.target.value })
                                    }
                                    className="w-full pl-10 pr-3 py-2 bg-green-50 border rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-600 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="h-5 w-5 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <SquarePen className="h-5 w-5" />
                                                Update
                                            </>
                                        )}
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently update your credentials.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => updateCredential(credential._id, updatedCredential)}
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="h-5 w-5 animate-spin" />
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash className="h-5 w-5" />
                                                Delete
                                            </>
                                        )}
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete this credential.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-red-600 text-white hover:bg-red-700"
                                            onClick={() => deleteCredential(credential._id)}
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl px-10 py-8 space-y-6 transition-all duration-300">
                        <h2 className="text-2xl font-bold text-green-700 underline underline-offset-4 tracking-wide">
                            Strong Password Guidelines
                        </h2>

                        <div className="space-y-4">
                            <PasswordStrengthMeter password={updatedCredential.password} />

                            <ul className="list-disc pl-6 text-sm md:text-base text-gray-600 space-y-2 leading-relaxed">
                                <li>
                                    <span className="font-medium text-gray-800">Use at least 12 characters</span>
                                </li>
                                <li>
                                    <span className="font-medium text-gray-800">Mix uppercase & lowercase letters</span>
                                </li>
                                <li>
                                    <span className="font-medium text-gray-800">Include numbers & special symbols</span>
                                </li>
                                <li>
                                    <span className="font-medium text-gray-800">Avoid common phrases or dictionary words</span>
                                </li>
                                <li>
                                    <span className="font-medium text-gray-800">Never reuse old passwords</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CredentialPage