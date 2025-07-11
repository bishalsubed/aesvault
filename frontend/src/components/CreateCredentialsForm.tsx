import { EyeIcon, EyeOff, Link, Loader, Lock, Mail, PlusCircle } from "lucide-react";
import { useRef, useState } from "react"
import { useCredentialStore } from "@/stores/useCredentialsStore";

const CreateCredentialsForm = () => {
    const [newCredential, setNewCredential] = useState({
        account: "",
        password: "",
        websiteUrl: "",
    })

    const { createCredential, loading } = useCredentialStore();


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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createCredential(newCredential)
        setNewCredential({
            account: "",
            password: "",
            websiteUrl: "",
        })
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 rounded-xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center tracking-tight">Create New Credential</h2>

            <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-800 mb-1">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-green-600" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            required
                            value={newCredential.account}
                            placeholder="example@example.com"
                            onChange={(e) => setNewCredential({ ...newCredential, account: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 bg-green-50 border border-green-300 rounded-md text-sm placeholder-gray-500 shadow-sm focus:ring-green-500 focus:border-green-600 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-green-800 mb-1">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-green-600" />
                        </div>
                        <input
                            id="password"
                            ref={passwordRef}
                            type={isPasswordVisible ? "text" : "password"}
                            required
                            value={newCredential.password}
                            placeholder="******"
                            onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })}
                            className="w-full pl-10 pr-10 py-2 bg-green-50 border border-green-300 rounded-md text-sm placeholder-gray-500 shadow-sm focus:ring-green-500 focus:border-green-600 outline-none"
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
                </div>

                <div>
                    <label htmlFor="websiteUrl" className="block text-sm font-medium text-green-800 mb-1">Website URL</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Link className="h-5 w-5 text-green-600" />
                        </div>
                        <input
                            id="websiteUrl"
                            type="url"
                            required
                            value={newCredential.websiteUrl}
                            placeholder="https://example.com"
                            onChange={(e) => setNewCredential({ ...newCredential, websiteUrl: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 bg-green-50 border border-green-300 rounded-md text-sm placeholder-gray-500 shadow-sm focus:ring-green-500 focus:border-green-600 outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-green-600 text-white text-sm font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader className="h-5 w-5 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        <>
                            <PlusCircle className="h-5 w-5" />
                            Create Credential
                        </>
                    )}
                </button>
            </form>
        </div>

    )
}

export default CreateCredentialsForm