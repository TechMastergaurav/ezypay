import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Welcome to EzyPay</h1>

            <div className="flex justify-center space-x-8">
                <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-500 hover:to-blue-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={() => {
                        navigate("/signup");
                    }}
                >
                    Sign Up
                </button>

                <button
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-teal-500 hover:to-green-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
                    onClick={() => {
                        navigate("/signin");
                    }}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}
