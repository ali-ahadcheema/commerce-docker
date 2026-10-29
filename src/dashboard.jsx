import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const TABS = [
    { key: "needship", label: "Needs Shipping" },
    { key: "shipped", label: "Shipped" },
    { key: "unpaid", label: "Unpaid" },
];

export function Dashboard() {
    const [order, setorder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchparam, setparams] = useSearchParams();

    const shipping = searchparam.get("tab") || "needship";

    const fetching = async () => {
        setLoading(true);
        let url = "http://localhost:3000/link/orders/admin";
        if (shipping === "needship") {
            url += "?status=processing&payment=paid";
        } else if (shipping === "shipped") {
            url += "?status=shipped";
        } else if (shipping === "unpaid") {
            url += "?payment=unpaid";
        }
        try {
            const response = await axios.get(url, { withCredentials: true });
            setorder(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetching();
    }, [shipping]);

    const changestaus = async (orderid) => {
        try {
            const res = await axios.put(
                "http://localhost:3000/link/admin/ship",
                { id: orderid },
                { withCredentials: true }
            );
            console.log(res?.data?.user?.email);
            fetching();
        } catch (error) {
            console.log(error.message);
            console.log(error.response?.data)
        }
    };

    return (
        <div className="min-h-screen w-full bg-stone-50 text-stone-900">
            <div className="mx-auto max-w-3xl px-6 py-10">
                <header className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
                        <p className="mt-1 text-sm text-stone-500">
                            Review payment status and move orders through fulfillment.
                        </p>
                    </div>

                    <Link
                        to="/"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <path d="M3 10.5 12 3l9 7.5" />
                            <path d="M5 9.5V21h14V9.5" />
                        </svg>
                        Home
                    </Link>
                </header>

                <nav className="mb-6 flex gap-1 border-b border-stone-200">
                    {TABS.map((t) => {
                        const active = shipping === t.key;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setparams({ tab: t.key })}
                                className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${active
                                    ? "text-stone-900"
                                    : "text-stone-400 hover:text-stone-600"
                                    }`}
                            >
                                {t.label}
                                {active && (
                                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-stone-900" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {loading ? (
                    <div className="flex flex-col gap-3">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="h-20 animate-pulse rounded-lg border border-stone-200 bg-white"
                            />
                        ))}
                    </div>
                ) : Array.isArray(order) && order.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                        {order.map((item) => {
                            const canShip =
                                item.payment === "paid" && item.status === "processing";
                            return (
                                <li
                                    key={item._id}
                                    className="flex items-center justify-between gap-4 rounded-lg border border-stone-200 bg-white px-5 py-4"
                                >
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <p className="text-xs uppercase tracking-wide text-stone-400">
                                                Amount
                                            </p>
                                            <p className="mt-0.5 font-medium">
                                                ${item.totalamount}
                                            </p>
                                        </div>

                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${item.payment === "paid"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-amber-50 text-amber-700"
                                                }`}
                                        >
                                            {item.payment}
                                        </span>

                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${item.status === "shipped"
                                                ? "bg-blue-50 text-blue-700"
                                                : "bg-stone-100 text-stone-600"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>

                                    {canShip ? (
                                        <button
                                            type="button"
                                            onClick={() => changestaus(item._id)}
                                            className="shrink-0 rounded-md bg-stone-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
                                        >
                                            Mark as shipped
                                        </button>
                                    ) : null}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 py-16 text-center">
                        <p className="text-sm font-medium text-stone-600">
                            No orders here
                        </p>
                        <p className="mt-1 text-sm text-stone-400">
                            Orders matching this tab will show up here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}