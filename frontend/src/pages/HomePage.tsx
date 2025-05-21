import { Github, Twitter, Facebook, Lock, ShieldPlus, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HomePage = () => {


    return (
        <div className="flex flex-col bg-gradient-to-b from-background to-green-900/10">
            <div className="container mx-auto px-4 py-12 flex-grow">
                <Card className="mb-12 border-none bg-gradient-to-r from-green-500/20 to-green-50/20">
                    <CardHeader>
                        <CardTitle className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-100">
                            Welcome to AESVault
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-xl text-muted-foreground mb-8">
                            Revolutionize your security with AESVault – The ultimate password management solution for individuals and teams.
                        </p>
                        <div className="flex justify-center space-x-6">
                            <Button asChild size="lg" className="text-lg bg-green-600 hover:bg-green-500">
                                <Link to="/signup">Start for Free</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg">
                                <Link to="/login">Login</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-12 border-none">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-green-600">
                            Powerful Features for Effortless Password Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <Lock className="h-16 w-16 text-green-600 mb-4" />
                                <h4 className="text-xl font-semibold mb-3">
                                    Military-Grade Encryption
                                </h4>
                                <p className="text-muted-foreground">
                                    Your passwords are secured with AES-256 encryption, ensuring top-tier protection.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <ShieldPlus className="h-16 w-16 text-green-600 mb-4" />
                                <h4 className="text-xl font-semibold mb-3">
                                    AI-Powered Security Audits
                                </h4>
                                <p className="text-muted-foreground">
                                    Get real-time insights into weak, reused, or compromised passwords and improve your security effortlessly.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <CircleUserRound className="h-16 w-16 text-green-600 mb-4" />
                                <h4 className="text-xl font-semibold mb-3">
                                    Zero-Knowledge Encryption
                                </h4>
                                <p className="text-muted-foreground">
                                    Only you can access your passwords—not even us. Your data stays fully encrypted at all times.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-12 border-none bg-gradient-to-r from-green-500/20 to-green-50/20">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-green-600">
                            What Our Users Say
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <blockquote className="italic text-lg text-muted-foreground">
                                &ldquo;AESVault has revolutionized how we handle sensitive credentials. It&apos;s secure, seamless, and a game-changer!&rdquo;
                                <footer className="text-right font-semibold mt-2">
                                    - Rosey J., Cybersecurity Specialist
                                </footer>
                            </blockquote>
                            <blockquote className="italic text-lg text-muted-foreground">
                                &ldquo;I&apos;ve tried many password management apps, but AESVault
                                is by far the best. It&apos;s boosted my security
                                tenfold!&rdquo;
                                <footer className="text-right font-semibold mt-2">
                                    - Sean T., Entrepreneur
                                </footer>
                            </blockquote>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <footer className="bg-muted py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex justify-center space-x-6 mb-4 md:mb-0">
                        <a
                            href="#"
                            className="text-green-900 hover:text-green-600 transition-colors"
                        >
                            <span className="sr-only">GitHub</span>
                            <Github className="h-8 w-8" />
                        </a>
                        <a
                            href="#"
                            className="text-green-900 hover:text-green-600 transition-colors"
                        >
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-8 w-8" />
                        </a>
                        <a
                            href="#"
                            className="text-green-900 hover:text-green-600 transition-colors"
                        >
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-8 w-8" />
                        </a>
                    </div>
                    <p className="text-center text-sm text-green-600">
                        &copy; 2025 AESVault. All rights reserved. |{" "}
                        <Link to="/privacy" className="hover:underline">
                            Privacy Policy
                        </Link>{" "}
                        |{" "}
                        <Link to="/terms" className="hover:underline">
                            Terms of Service
                        </Link>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage