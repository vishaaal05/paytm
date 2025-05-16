export const Balance = ({value}) => {
    return <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <div className="text-gray-500 font-medium">Your Balance</div>
                <div className="text-3xl font-bold text-gray-800">
                    ₹{value}
                </div>
            </div>
            <div className="bg-primary-50 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
}