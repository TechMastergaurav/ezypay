import { useNavigate } from "react-router-dom";

export default function Confirmation() {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-50 to-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Transfer Successful</h1>
                <p className="text-lg font-medium text-gray-600 mb-6">Your transaction has been completed successfully.</p>
                <button
                    className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                    onClick={() => navigate('/dashboard')}
                >
                    Go back to Dashboard
                </button>
            </div>
        </div>
    );
}
