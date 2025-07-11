import { Github, Twitter, Facebook, Lock, ShieldPlus, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HomePage = () => {


    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f6fef8] via-[#ecf7f0] to-[#e7f3eb] text-neutral-800">
            <div className="container mx-auto px-4 py-16 flex-grow space-y-20">

                <Card className="border-none bg-gradient-to-r from-green-500/30 to-green-100/30 shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-400">
                            Welcome to AESVault
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-lg text-neutral-600 max-w-2xl mx-auto mb-10">
                            Revolutionize your security with AESVault – the ultimate password management solution for individuals and teams.
                        </p>
                        <div className="flex justify-center gap-6">
                            <Button asChild size="lg" className="text-lg bg-green-600 hover:bg-green-500 shadow-md transition-all">
                                <Link to="/signup">Start for Free</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg border-green-500 text-green-700 hover:bg-green-50">
                                <Link to="/login">Login</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none bg-white/60 backdrop-blur-sm shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-green-700">
                            Powerful Features for Effortless Password Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                                <Lock className="h-14 w-14 text-green-600 mb-4" />
                                <h4 className="text-xl font-semibold mb-3">Military-Grade Encryption</h4>
                                <p className="text-neutral-600">Your passwords are secured with AES-256 encryption, ensuring top-tier protection.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                                <ShieldPlus className="h-14 w-14 text-green-600 mb-4" />
                                <h4 className="text-xl font-semibold mb-3">AI-Powered Security Audits</h4>
                                <p className="text-neutral-600">Get real-time insights into weak, reused, or compromised passwords and improve your security effortlessly.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                                <CircleUserRound className="h-14 w-14 text-green-600 mb-4" />
                                <h4 className="text-xl font-semibold mb-3">Zero-Knowledge Encryption</h4>
                                <p className="text-neutral-600">Only you can access your passwords—not even us. Your data stays fully encrypted at all times.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none bg-gradient-to-r from-[#e1f4e8] to-[#f4fdf6] shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-green-700">
                            What Our Users Say
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <blockquote className="italic text-lg text-neutral-700 bg-white/80 p-6 rounded-xl shadow">
                                &ldquo;AESVault has revolutionized how we handle sensitive credentials. It&apos;s secure, seamless, and a game-changer!&rdquo;
                                <footer className="text-right font-semibold mt-4 text-green-700">- Rosey J., Cybersecurity Specialist</footer>
                            </blockquote>
                            <blockquote className="italic text-lg text-neutral-700 bg-white/80 p-6 rounded-xl shadow">
                                &ldquo;I&apos;ve tried many password management apps, but AESVault is by far the best. It&apos;s boosted my security tenfold!&rdquo;
                                <footer className="text-right font-semibold mt-4 text-green-700">- Sean T., Entrepreneur</footer>
                            </blockquote>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <footer className="bg-[#f0fdf4] py-8 border-t border-green-100">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex justify-center space-x-6 mb-4 md:mb-0">
                        <a href="#" className="text-green-700 hover:text-green-600 transition-colors">
                            <span className="sr-only">GitHub</span>
                            <Github className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-green-700 hover:text-green-600 transition-colors">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-green-700 hover:text-green-600 transition-colors">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-6 w-6" />
                        </a>
                    </div>
                    <p className="text-center text-sm text-green-700">
                        &copy; 2025 AESVault. All rights reserved. |{" "}
                        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>{" "}
                        |{" "}
                        <Link to="/terms" className="hover:underline">Terms of Service</Link>
                    </p>
                </div>
            </footer>
        </div>

    );
}

export default HomePage