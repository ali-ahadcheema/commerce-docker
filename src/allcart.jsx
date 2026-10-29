import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAuth } from "./context";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#1f2937",
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            "::placeholder": { color: "#9ca3af" }
        },
        invalid: { color: "#ef4444", iconColor: "#ef4444" }
    }
};

export function Cart() {
    const [cart, setcart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartload, setload] = useState(false)
    const [stripesecret, setsecret] = useState("")
    const [stripeform, setform] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()
    useEffect(() => {
        axios.get("http://localhost:3000/link/allcart", {
            withCredentials: true
        })
            .then((res) => {
                setcart(res.data.items || []);
                setLoading(false);
                setload(false)
            })
            .catch((error) => {
                console.log(error.message);
                setcart([]);
                setLoading(false);
            });
    }, [cartload]);

    const ordercart = async () => {
        try {
            const response = await axios.post("http://localhost:3000/link/addorder", {
                userId: user?._id
            }, {
                withCredentials: true
            })

            const stripe = await axios.post("http://localhost:3000/link/payment/create", {
                orderId: response.data._id
            }, {
                withCredentials: true
            })
            setsecret(stripe.data.clientsecret)
            setform(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    const paynow = async () => {
        try {
            const result = await stripe.confirmCardPayment(stripesecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })
            if (result.error) {
                alert(`payment error :${result.error.message}`)
            }
            else if (result.paymentIntent.status == "succeeded") {
                alert("payment succesfully")
            }

        }
        catch (error) {
            console.log(error.message)
        }
    }

    const delcart = (id) => {

        axios.delete("http://localhost:3000/link/delcart", {
            data: { productId: id },
            withCredentials: true
        }
        ).then((res) => {
            console.log(res.data)
            alert("product is dleted")
            setload(true)
        }).catch((error) => console.log(error))

    }

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-[#F6F5F1] p-6">
                <div className="mx-auto max-w-3xl">
                    <div className="flex flex-col gap-px bg-[#DEDACE]">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-20 animate-pulse bg-white" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#F6F5F1] text-[#14181F] font-sans">
            <div className="mx-auto max-w-3xl px-6 py-12">
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm font-medium text-[#8A8477] transition-colors hover:text-[#14181F]"
                    >
                        Home
                    </button>
                </div>

                <header className="mb-10">
                    <h1 className="text-3xl font-semibold tracking-tight text-[#14181F]">
                        Your cart
                    </h1>
                    <p className="mt-2 text-sm text-[#8A8477]">
                        Review your items before checking out.
                    </p>
                </header>


                {/* Payment Card */}
                {stripeform && (
                    <div className="mb-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm max-w-lg mx-auto">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Complete Your Payment</h2>
                        <div className="p-4 border border-gray-200 rounded-lg bg-[#faf9f7]">
                            <CardElement options={CARD_ELEMENT_OPTIONS} />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-xs text-gray-500">Enter card details to confirm order.</p>
                            <button
                                onClick={paynow}
                                className="px-5 py-2.5 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                )}
                {cart.length > 0 ? (
                    <div>
                        <ul className="flex flex-col overflow-hidden rounded-md border border-[#DEDACE]">
                            {cart.map((item, key) => (
                                <li
                                    key={key}
                                    className={`flex items-center gap-5 border-l-[3px] border-l-[#1F6F5C] bg-white px-5 py-4 ${key === 0 ? "" : "border-t border-t-[#EDEAE1]"
                                        }`}
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-[#14181F]">
                                            {item.product?.name}
                                        </p>
                                        <p className="mt-0.5 text-sm text-[#8A8477]">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="w-20 shrink-0 text-right font-mono text-base font-medium text-[#1F6F5C]">
                                        ${item.price}
                                    </p>

                                    <button
                                        onClick={() => delcart(item.product._id)}
                                        className="shrink-0 text-sm font-medium text-[#B5651D] transition-colors hover:text-[#8A4413]"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="bg-emerald-800 text-white rounded mt-2" onClick={ordercart}>order now</button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-[#DEDACE] py-16 text-center">
                        <p className="text-sm font-medium text-[#5A5548]">
                            Your cart is empty
                        </p>
                        <p className="mt-1 text-sm text-[#B0AA9B]">
                            Items you add will show up here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}