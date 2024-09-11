import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendMoney(props) {
    const navigate = useNavigate();
    const authHeader = window.localStorage.getItem("Authorization");
    const headers = {
        'Authorization': authHeader
    };
    const to = props.to;
    const [amount, setAmount] = useState(0);
    const body = {
        to, amount
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Send Money</h1>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-700 ml-4">{props.name}</h2>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Amount (in Rs)</h3>
                <input
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                    type="number"
                    placeholder="Enter amount"
                />
            </div>

            <button
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                onClick={async () => {
                    await axios.post("http://localhost:3000/api/v1/account/transfer", body, { headers });
                    navigate('/confirmation');
                }}
            >
                Initiate Transfer
            </button>
        </div>
    );
}
