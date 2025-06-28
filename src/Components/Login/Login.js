import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import loginImage from "../../assets/loo.jpg"; 

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem("savedEmail");
        const savedPassword = localStorage.getItem("savedPassword");

        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://skillswapbackend-gtr9.onrender.com/api/auth/login", {
                email,
                password,
        });


            localStorage.setItem("token", response.data.token);

            if (rememberMe) {
                localStorage.setItem("savedEmail", email);
                localStorage.setItem("savedPassword", password);
            } else {
                localStorage.removeItem("savedEmail");
                localStorage.removeItem("savedPassword");
            }

            alert("Login successful!");
            history.push("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-300 px-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
                {/* Left Form Section */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center text-white">
                        Login to Your Dashboard
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                            <span className="text-gray-500 mr-2">📧</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white">
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer text-gray-500 mr-2"
                            >
                                {showPassword ? "🔓" : "🔒"}
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="flex-1 outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm text-white">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="mr-2"
                                />
                                Remember Me
                            </label>
                            <Link to="/forgot-password" className="text-blue-200 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-white">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-800 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>

                {/* Right Image Panel */}
                <div className="hidden md:flex md:w-1/2 relative">
                    <img
                        src={loginImage}
                        alt="Login visual"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-8">
                        <h1 className="text-3xl font-bold mb-3">Welcome Back!</h1>

                        <p className="text-lg">Enter your credentials to connect and learn together.</p>

                        <Link
                            to="/"
                            className="mt-4 text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
                        >
                            ← Back to Home
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
