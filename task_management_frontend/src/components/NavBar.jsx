import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import { removeAccessToken, removeRefreshToken, getAccessToken } from "../utils/token";

function Navbar() {
    const navigate = useNavigate();
    const token = getAccessToken();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error(err);
        } finally {
            removeAccessToken();
            removeRefreshToken();
            navigate("/login");
        }
    };

    return (
        <nav className="bg-slate-800 text-white px-6 py-3 shadow-lg flex justify-between items-center">
            
            <h1
                onClick={() => navigate("/")}
                className="text-xl font-extrabold cursor-pointer tracking-wide"
            >
                Task Manager
            </h1>

            <div className="flex items-center">
                
                {!token ? (
                    <>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-1.5 font-bold bg-slate-600 hover:bg-slate-700 rounded-l cursor-pointer transition"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="px-4 py-1.5 font-bold bg-white text-slate-800 hover:bg-gray-200 rounded-r cursor-pointer transition"
                        >
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/tasks")}
                            className="px-4 py-1.5 font-bold hover:bg-slate-700 rounded cursor-pointer transition"
                        >
                            Tasks
                        </button>

                        <button
                            onClick={handleLogout}
                            className="ml-2 px-4 py-1.5 font-bold bg-red-500 hover:bg-red-600 rounded cursor-pointer transition"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;