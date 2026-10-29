import { useState } from "react";
import axios from "axios";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [form, setform] = useState({
        email: "",
        password: ""
    });

    const [message, setmessage] = useState("")
    const navigate = useNavigate();
    const { login } = useAuth();

    const handel = (e) => {
        setform({
            ...form, [e.target.name]: e.target.value
        });
    };

    const handllogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/link/login", {
            email: form.email,
            password: form.password
        }, {
            withCredentials: true
        }).then((res) => {
            const { user } = res.data;
            console.log(user);
            login(user);
            alert("login succesful");
            navigate("/");
        }).catch((error) => {
            const backend = error.response?.data || "somethign went wrong"
            setmessage(backend)
            console.log(error.message);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] px-4">
            <div className="bg-white  rounded-2xl shadow-sm p-10 w-full max-w-sm">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Login</h1>
                <p className="text-gray-500 text-sm mb-8">Welcome back, please enter your details.</p>

                <form onSubmit={handllogin} className="flex flex-col gap-4">
                    <input
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition"
                        placeholder="Email"
                        type="text"
                        name="email"
                        onChange={handel}
                    />
                    <input
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handel}
                    />
                    <button
                        type="submit"
                        className="bg-black text-white rounded-lg py-2.5 text-sm font-medium mt-2 hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-500 text-sm mt-5">{message}</p>
            </div>
        </div>
    );
}