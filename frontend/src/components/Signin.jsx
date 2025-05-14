import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Sign In</h1>
                <p className="text-lg font-medium text-gray-600">Enter your credentials to access your account</p>
            </div>
            
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    type="text"
                    placeholder="john@example.com"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    type="password"
                    placeholder="••••••••"
                />
            </div>

            <button
                className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                onClick={async () => {
                    const postData = { username, password };
                    try {
                        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, postData);
                        window.localStorage.setItem("Authorization", "Bearer " + response.data.token);
                        navigate("/dashboard");
                    } catch (error) {
                        console.error("Sign in error:", error);
                    }
                }}
            >
                Sign In
            </button>

            <div className="flex flex-col items-center mt-6">
                <p className="text-sm text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}
