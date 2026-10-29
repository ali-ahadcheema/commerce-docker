import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useAuth } from "./context";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { First } from "./heroes/first";


const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#201D18",
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            "::placeholder": {
                color: "#8A8375"
            }
        },
        invalid: {
            color: "#B23A2E",
            iconColor: "#B23A2E"
        }
    }
};

export function Front() {
    const [products, setproducts] = useState([]);
    const [quantity, setquantity] = useState({});
    const [secret, setsecret] = useState(null);
    const [cardform, showform] = useState(false);
    const [editdel, setdel] = useState(false);

    // AI states
    const [agent, setagent] = useState(false);
    const [promt, setpromt] = useState("");
    const [message, setmessages] = useState([]);
    const [think, setthink] = useState(false);

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const { user, logout } = useAuth();

    // =========================
    // AI ASSISTANT
    // =========================

    const agentsub = async () => {
        if (!promt.trim()) return;

        const currentPrompt = promt;

        setmessages((pre) => [
            ...pre,
            {
                role: "user",
                text: currentPrompt
            }
        ]);

        setthink(true);
        setpromt("");

        try {
            const response = await axios.post(
                "http://localhost:3000/link/aicalling",
                {
                    prompt: currentPrompt
                },
                {
                    withCredentials: true
                }
            );

            setmessages((pre) => [
                ...pre,
                {
                    role: "ai",
                    text: response.data,
                    image: response.data?.image
                }
            ]);
        } catch (error) {
            console.log(error);

            setmessages((pre) => [
                ...pre,
                {
                    role: "ai",
                    text: "Something went wrong"
                }
            ]);
        } finally {
            setthink(false);
        }
    };

    // =========================
    // GET PRODUCTS
    // =========================

    useEffect(() => {
        axios
            .get("http://localhost:3000/link/products")
            .then((res) => {
                setproducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // =========================
    // QUANTITY
    // =========================

    const increasequantity = (item) => {
        setquantity((prev) => ({
            ...prev,
            [item]: (prev[item] || 1) + 1
        }));
    };

    const decrsequnaity = (item) => {
        setquantity((prev) => ({
            ...prev,
            [item]: prev[item] > 1
                ? prev[item] - 1
                : 1
        }));
    };

    // =========================
    // ADD TO CART
    // =========================

    const addcart = async (id, qty) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/link/addcart",
                {
                    userId: user?._id,
                    productId: id,
                    quantity: qty
                },
                {
                    withCredentials: true
                }
            );

            console.log(response.data);

            alert("Item in cart is successfully stored");
        } catch (error) {
            console.log(error);
        }
    };

    // =========================
    // DELETE PRODUCT
    // =========================

    const del = async (id) => {
        try {
            const response = await axios.delete(
                "http://localhost:3000/link/delete",
                {
                    data: {
                        userId: user?._id,
                        productId: id
                    },
                    withCredentials: true
                }
            );

            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // =========================
    // ORDER
    // =========================

    const order = async (id, qty) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/link/addorder",
                {
                    userId: user?._id,
                    productId: id,
                    quantity: qty
                },
                {
                    withCredentials: true
                }
            );

            const stripepayment = await axios.post(
                "http://localhost:3000/link/payment/create",
                {
                    orderId: response.data._id
                },
                {
                    withCredentials: true
                }
            );

            setsecret(
                stripepayment.data.clientSecret ||
                stripepayment.data.clientsecret
            );

            showform(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    // =========================
    // PAYMENT
    // =========================

    const paynow = async () => {
        try {
            const result = await stripe.confirmCardPayment(
                secret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                }
            );

            if (result.error) {
                alert(
                    `Payment error: ${result.error.message}`
                );
            } else if (
                result.paymentIntent.status === "succeeded"
            ) {
                alert("Payment successful!");
                showform(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>

            <First />
        </div>

    )
}