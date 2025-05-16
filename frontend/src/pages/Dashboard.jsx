import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

export const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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
        <div>
            <Appbar />
            <div className="m-8">
                {loading ? 'Loading...' : error ? error : (
                    <div>
                        <div className="font-bold text-lg">
                            Hello, {userName}
                        </div>
                        <Balance value={balance.toLocaleString()} />
                    </div>
                )}
                {/* {loading ? 'Loading...' : error ? error : <Balance value={balance.toLocaleString()} />} */}
                <Users />
            </div>
        </div>
    );
}