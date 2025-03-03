import { EyeIcon, EyeOff, Link, Loader, Lock, Mail, PlusCircle } from "lucide-react";
import { useRef, useState } from "react"
import { useCredentialStore } from "@/stores/useCredentialsStore";

const CreateCredentialsForm = () => {
    const [newCredential, setNewCredential] = useState({
        account: "",
        password: "",
        websiteUrl: "",
    })

    const { createCredential,loading}  = useCredentialStore();


    const passwordRef = useRef<HTMLInputElement>(null)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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

    const handleSubmit = (e:React.FormEvent) => { 
        e.preventDefault();
        createCredential(newCredential)
        setNewCredential({
            account: "",
            password: "",
            websiteUrl: "",
        })
        
     }

    return (
        <div
            className='border-2 border-gray-600shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
        >
            <h2 className='text-2xl font-semibold mb-6 text-green-700 underline decoration-2 underline-offset-2'>Create New Credential</h2>

            <form onSubmit={handleSubmit} className='space-y-6'>
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
                            value={newCredential.account}
                            placeholder="example@example.com"
                            onChange={(e) => setNewCredential({ ...newCredential, account: e.target.value })}
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
                            value={newCredential.password}
                            placeholder="******"
                            onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })}
                            className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
							    placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? (<EyeIcon className="size-5 text-green-700" />) : (<EyeOff className="size-5 text-green-700" />)}
                        </div>
                    </div>
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
                            value={newCredential.websiteUrl}
                            placeholder="https://example.com"
                            onChange={(e) => setNewCredential({ ...newCredential, websiteUrl: e.target.value })}
                            className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
						        placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                        />
                    </div>
                </div>
                <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
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
                            <PlusCircle className='mr-2 h-5 w-5' />
                            Create Credential
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default CreateCredentialsForm