import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Header() {

    const navigate = useNavigate()
    return (
        <>
            <div> <div className="h-10 w-full bg-black text-white flex justify-around">
                <p>Free shipping, 30-day return or refund guarantee.</p>
                <div className="flex gap-6 jsutify-around">
                    <button onClick={() => navigate("/login")} className="text-white cursor-pointer ">Sign in</button>
                    <p className="mt-2">FAQS</p>
                </div>
            </div>
                <div className="h-18 w-full text-brand-black flex justify-around  bg-white">
                    <h1 className="text-2xl italic">MALE FASHION</h1>
                    <div className="flex gap-3">
                        <Link to="/">HOME</Link>
                        <Link to="/shop">SHOP</Link>
                        <Link>CONTACT</Link>
                        <Link>PAGES</Link>
                    </div>
                    <div className="flex justify-evenly">
                        <Search size={24} color="black" />
                    </div>
                </div>

            </div>
        </>
    )
}