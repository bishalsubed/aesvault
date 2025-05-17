import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore'
import { ChevronLeft, Loader, Mail, SquarePen } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const { loading, forgotPassword } = useUserStore();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        forgotPassword(email)
        setEmail("")
    }
    return (
        <div className="min-h-screen">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mt-16 md:mt-4">
                <ChevronLeft className="h-4 w-4" />
                Back
            </Button>
            <div className="flex flex-col justify-center items-center py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-green-700 mb-4">Reset Password</h1>
                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md py-7 px-3 sm:rounded-lg sm:px-10 border-2 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    value={email}
                                    placeholder="example@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='block w-full px-3 py-2 pl-10 bg-green-50 border rounded-md shadow-sm
						        placeholder-gray-600 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm'
                                />
                            </div>
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
                                    <SquarePen className='mr-2 h-5 w-5' aria-hidden='true' />
                                    Submit
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage