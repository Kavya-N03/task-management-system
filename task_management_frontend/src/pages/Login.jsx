import { useState } from "react"
import { loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        username:"",
        password:""
    });
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true)
            await loginUser(formData)
            navigate('/tasks');
        }
        catch(err){
            setError(err.message)
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Login
                </h2>

                <input 
                    type="text" 
                    name="username"
                    value={formData.username} 
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input 
                    type="password" 
                    name="password"
                    value={formData.password} 
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {loading ? "Logging In..." : "Login"}
                </button>

                {error && (
                    <p className="text-red-500 mt-2 text-sm">{error}</p>
                )}

                {/* Register redirect */}
                <p className="text-sm text-center mt-4">
                    New user?{" "}
                    <Link 
                        to="/register" 
                        className="text-blue-500 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;