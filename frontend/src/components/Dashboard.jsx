import { useEffect, useState } from "react";
import axios from 'axios';
import SendMoney from "./SendMoney";

export default function Dashboard() {
    const authHeader = window.localStorage.getItem('Authorization');
    const headers = {
        'Authorization': authHeader
    };

    const [sendMoney, setSendMoney] = useState(false);
    const [balance, setBalance] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [to, setTo] = useState("");
    const params = {
        filter: searchInput
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/account/balance`, { headers });
                setBalance(response.data.balance);
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/currentUser`, { headers });
                setCurrentUser(res.data.firstName);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (!sendMoney) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">EzyPay</h1>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-gray-700 mr-4">Hello, {currentUser}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                </div>
                <hr className="border-t-2 border-gray-200 mb-8" />
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Balance: <span className="text-green-500">${balance}</span></h2>
                    
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold text-gray-800">Users</h3>
                        <input
                            onChange={async (e) => {
                                setSearchInput(e.target.value);
                                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/bulk`, { params, headers });
                                setUsers(response.data.user);
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Search Users..."
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {users.map((user) => (
                            <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-gray-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <h4 className="text-lg font-medium text-gray-800 ml-4">{user.firstName + " " + user.lastName}</h4>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setName(user.firstName + " " + user.lastName);
                                            setTo(user.username);
                                            setSendMoney(true);
                                        }}
                                        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-150"
                                    >
                                        Send Money
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return <SendMoney to={to} name={name} />;
    }
}

