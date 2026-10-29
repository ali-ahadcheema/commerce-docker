import axios from "axios";
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

export const Authcontext = createContext()

export function Authprovider({ children }) {
    const [user, setuser] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3000/link/me", {
            withCredentials: true
        }).then((res) => {
            setuser(res.data.user)
            console.log(res.data)
        }).catch((error) => {
            console.log(error.message)
        })

    }, [])

    const login = (user) => {
        setuser(user)
    }

    const logout = () => {
        axios.post("http://localhost:3000/link/logout", {}, {
            withCredentials: true
        }).then(() => {
            setuser(null)
            alert("user succesfull logout")
        }).catch((error) => console.log(error))
    }
    return (
        <Authcontext.Provider value={{ user, login, logout }}>
            {children}
        </Authcontext.Provider>
    )
}

export const useAuth = () => {
    return useContext(Authcontext)
}
