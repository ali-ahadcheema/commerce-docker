import { useState } from "react";
import axios from "axios";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";

export function Sign() {
    const [from, setform] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handel = (e) => {
        setform({ ...from, [e.target.name]: e.target.value });
    };

    const sign = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/link/sign", {
            name: from.name,
            email: from.email,
            password: from.password
        }, {
            withCredentials: true
        }).then((res) => {
            console.log(res.data);
            const { user } = res.data;
            login(user);
            alert("Successful Signup");
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] px-4">
            <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-sm">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Sign Up</h1>
                <p className="text-gray-500 text-sm mb-8">Create an account to get started.</p>

                <form onSubmit={sign} className="flex flex-col gap-4">
                    <input
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition"
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                        onChange={handel}
                    />
                    <input
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition"
                        name="email"
                        type="text"
                        placeholder="Email"
                        onChange={handel}
                    />
                    <input
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        onChange={handel}
                    />
                    <button
                        type="submit"
                        className="bg-black text-white rounded-lg py-2.5 text-sm font-medium mt-2 hover:bg-gray-800 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}