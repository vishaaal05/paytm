import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");
        // Navigate to signin page
        navigate("/signin");
    };

    return <div className="shadow h-14 flex justify-between items-center px-4">
        <div className="flex items-center">
            <img 
                src="wallet.png" 
                alt="Wallet Logo" 
                className="h-8 w-8" // Fixed size for logo
            />
            <span className="ml-2 font-semibold text-lg">Simp </span>
        </div>
        <div className="flex items-center gap-4">
    
            <button 
                onClick={handleLogout}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
            >
                Logout
            </button>
        </div>
    </div>
}