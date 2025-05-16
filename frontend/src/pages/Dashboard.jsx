import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useEffect, useState } from "react"

export const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to extract name from email
    const getNameFromEmail = (email) => {
        return email.split('@')[0];
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('https://simp-a-wallet.onrender.com/api/v1/account/balance', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setUserName(response.data.username);
                setBalance(response.data.balance);
            } catch (error) {
                setError('Error fetching balance');
                console.error('Error fetching balance:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Appbar />
            <div className="max-w-4xl mx-auto p-6">
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="font-bold text-2xl text-gray-800 mb-4">
                                Welcome back, {getNameFromEmail(userName)}! 👋
                            </div>
                            <Balance value={balance.toLocaleString()} />
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
                            <Users />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}