import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white transform transition-all duration-500 opacity-0`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.remove('opacity-0'), 100);
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    return <div className="flex justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-xl rounded-xl">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
                            <span className="text-2xl text-white font-semibold">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700">{name}</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Amount (in Rs)
                            </label>
                            <input
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                className="flex h-12 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                placeholder="Enter amount"
                                disabled={loading}
                            />
                        </div>
                        <button 
                            onClick={async () => {
                                if (!amount || amount <= 0) {
                                    showToast('Please enter a valid amount', 'error');
                                    return;
                                }
                                setLoading(true);
                                try {
                                    await axios.post("https://simp-a-wallet.onrender.com/api/v1/account/transfer", {
                                        to: id,
                                        amount
                                    }, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    });
                                    showToast('Payment successful!');
                                    setTimeout(() => navigate('/dashboard'), 2000);
                                } catch (error) {
                                    showToast('Payment failed. Please try again.', 'error');
                                } finally {
                                    setLoading(false);
                                }
                            }} 
                            disabled={loading}
                            className={`flex justify-center items-center rounded-lg text-sm font-medium transition-all h-12 px-6 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:opacity-90 ${
                                loading ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                                    Processing...
                                </div>
                            ) : 'Initiate Transfer'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}