import { Button } from "@/components/ui/button";
import { useCredentialStore } from "@/stores/useCredentialsStore";
import { ChevronLeft, Copy, EyeIcon, EyeOff, Loader, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom"
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
import { Input } from "@/components/ui/input";
const CredentialsPageForPhone = () => {

    const [obtainedCredential, setObtainedCredential] = useState({
        account: "",
        password: "",
        websiteUrl: "",
    })
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const navigate = useNavigate()
    const { credential, deleteCredential, getCredentialById, loading } = useCredentialStore();
    const { credentialId } = useParams();


    useEffect(() => {
        if (credentialId) {
            getCredentialById(credentialId)
        }
    }, [credentialId])

    useEffect(() => {
        if (credential) {
            setObtainedCredential({
                account: credential.account,
                password: credential.password,
                websiteUrl: credential.websiteUrl,
            });
        }
    }, [credential]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mt-16 md:mt-4">
                <ChevronLeft className="h-4 w-4" />
                Back
            </Button>
            <h1 className="text-2xl text-center font-medium underline underline-offset-4 md:pb-6">{credential?.websiteUrl ? credential.websiteUrl.split("/")[2].split(".")[0].toUpperCase() || "Unknown" : "unknown"}</h1>
            <div className="flex flex-col items-center justify-center mt-4">
                <div className="flex flex-col gap-6 bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md mt-4 mb-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold uppercase">Account</h2>
                        <div className="flex items-center justify-between px-2">
                            <p className="text-base font-semibold">{obtainedCredential.account}</p>
                            <Copy className="size-4 text-gray-300 cursor-pointer" onClick={() => { copyToClipboard(obtainedCredential.account) }} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold uppercase mt-4">Password</h2>
                        <div className="flex items-center justify-between gap-4">
                            <Input
                                disabled
                                id={credential._id}
                                type={isPasswordVisible ? "text" : "password"}
                                className='h-8 py-1 text-sm text-gray-50 bg-gray-800'
                                defaultValue={credential.password}
                            />
                            <div className="flex items-center gap-4">
                                <Copy className="size-4 text-gray-300 cursor-pointer" onClick={() => { copyToClipboard(obtainedCredential.password) }} />
                                <div className="flex items-center cursor-pointer" onClick={() => { togglePasswordVisibility() }}>
                                    {isPasswordVisible ? (<EyeIcon className="size-4 text-gray-300" />) : (<EyeOff className="size-4 text-gray-300" />)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold uppercase mt-4">Website URL</h2>
                        <div className="flex items-center justify-between px-2">
                        <a href={obtainedCredential.websiteUrl} className="text-base font-semibold underline underline-offset-8 decoration-1">{obtainedCredential.websiteUrl.split("/")[2]}</a>
                            <Copy className="size-4 text-gray-300 cursor-pointer" onClick={() => { copyToClipboard(obtainedCredential.websiteUrl) }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-around mt-4">
                <Link to={`/dashboard/${credentialId}`}
                    type='submit'
                    className='flex justify-center py-2 px-3 border border-transparent rounded-md 
					shadow-sm text-sm  font-medium text-white bg-green-600 hover:bg-green-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50'
                >
                    <SquarePen className='mr-2 h-5 w-5' />
                    Edit
                </Link>
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
                                Delete
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
    )
}

export default CredentialsPageForPhone