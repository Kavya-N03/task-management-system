import { useState } from "react"
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        username:"",
        email:"",
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
            await registerUser(formData)
            navigate("/login");
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
                    Register
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
                    type="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="Email"
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
                    {loading ? "Registering..." : "Register"}
                </button>

                {error && (
                    <p className="text-red-500 mt-2 text-sm">{error}</p>
                )}

                {/* Already registered section */}
                <p className="text-sm text-center mt-4">
                    Already registered?{" "}
                    <Link 
                        to="/login" 
                        className="text-blue-500 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;