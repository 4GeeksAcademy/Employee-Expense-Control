import { FileText, FilePlus, Folder } from "lucide-react";
import { Link } from 'react-router-dom';
import useEmployeeOpcions from "../hooks/useEmployeeOpcions";

const EmployeeOpcions = () => {
    useEmployeeOpcions()
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center p-6">
                <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl text-center border border-gray-200">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Hello Employee!</h1>
                    <p className="text-gray-600 text-lg mb-10">
                        If you don't have a budget yet, create it after entering the bills.
                    </p>

                    <div className="flex flex-col space-y-8">
                        <Link to={"/createbudget"}>
                            <button
                                className="flex items-center justify-center gap-3 bg-blue-600 text-black text-lg font-semibold py-4 px-8 rounded-2xl shadow-lg hover:bg-blue-700 transition duration-300 w-full"
                            >
                                <FileText size={28} />
                                Create New Budget
                            </button>
                        </Link>
                        <Link to={"/enterbill"}>
                            <button
                                className="flex items-center justify-center gap-3 bg-green-600 text-black text-lg font-semibold py-4 px-8 rounded-2xl shadow-lg hover:bg-green-700 transition duration-300 w-full"
                            >
                                <FilePlus size={28} />
                                Enter New Bill
                            </button>
                        </Link>
                        <Link to={"/mybudgets"}>
                            <button
                                className="flex items-center justify-center gap-3 bg-purple-600 text-black text-lg font-semibold py-4 px-8 rounded-2xl shadow-lg hover:bg-purple-700 transition duration-300 w-full"
                            >
                                <Folder size={28} />
                                My Budgets
                            </button>
                        </Link>
                        <Link to={"/employeeid"}>
                            <button
                                className="flex items-center justify-center gap-3 bg-yellow-500 text-black text-lg font-semibold py-4 px-8 rounded-2xl shadow-lg hover:bg-yellow-600 transition duration-300 w-full"
                            >
                                🔍 Get My ID
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>


    )
}

export default EmployeeOpcions