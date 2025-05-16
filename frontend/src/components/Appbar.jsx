import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");
        // Navigate to signin page
        navigate("/signin");
    };

    return <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg h-16 flex justify-between items-center px-6">
        <div className="flex items-center">
            <img 
                src="wallet.png" 
                alt="Wallet Logo" 
                className="h-10 w-10 filter" 
            />
            <span className="ml-3 font-bold text-xl">Simp</span>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={handleLogout}
                className="bg-white text-primary-700 px-5 py-2 rounded-full font-semibold 
                         hover:bg-opacity-90 transition-all duration-300 shadow-md"
            >
                Logout
            </button>
        </div>
    </div>
}