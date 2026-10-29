import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, SearchSlash } from "lucide-react";
import { Search } from "lucide-react";
import { useSearchParams, } from "react-router-dom";
import { Star, StarHalf } from "lucide-react";
import axios from "axios";

export function Shop() {

    const [drop, setdrop] = useState(null)
    const [categry, typecategory] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();


    const checkfilter = (key, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(key, value)
        setSearchParams(params)
    }

    useEffect(() => {
        const type = searchParams.get("type")
        const price = searchParams.get("price")

        const fetchdata = async () => {
            try {
                const hashfilter = type || price
                let url = hashfilter ? "http://localhost:3000/link/category" : "http://localhost:3000/link/products"

                const params = {};
                if (type) params.type = type;
                if (price) params.price = price;

                const response = await axios.get(url, { params })
                typecategory(Array.isArray(response.data) ? response.data : []);
            }
            catch (error) {
                console.log(error.message)
            }
        }
        fetchdata()
    }, [searchParams])



    const toggel = (name) => {
        setdrop(drop === name ? null : name)
    }


    return (
        <>
            <div className="w-full h-18 bg-[#F3F2EE] ">
                <h1 className="text-xl font-bold ml-4">SHOP</h1>
                <div className="flex gap-2 text-center ml-4 ">
                    <p className="text-black mt-0.5">HOME</p>
                    <ChevronRight className="h-8 w-3 " />
                    <p>shop</p>
                </div>
            </div>
            <div className="flex items-center justify-around">
                <div className="relative mt-4">
                    <input type="text" placeholder="Search..." className="border ml-1  h-10 w-64 pl-4 pr-10 outline-none" />
                    <Search className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
                <p className="font-stretch-normal">showing result</p>
                <button className="font-stretch-normal" > sort price:</button>
            </div >

            {/*dropdown*/}
            < div className="  mt-6  grid  grid-cols-4" >
                <div className="col-span-1 ml-10 gap-2  ">
                    <button className=" flex justify-around gap-5 items-center cursor-pointer  font-medium" onClick={() => toggel("categories")}>CATEGORIES  <ChevronDown className="h-8 w-6 " /></button>

                    <div className={`grid transition-all duration-300 ease-in-out ${drop === "categories" ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`} >
                        <div className="overflow-hidden flex flex-col gap-1 pl-4">
                            <button onClick={() => checkfilter("type", "men")} className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                MEN
                            </button>
                            <button onClick={() => checkfilter("type", "women")} className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                WOMEN
                            </button>
                            <button onClick={() => checkfilter("type", "kid")} className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                KIDS
                            </button>
                            <div className="border-t w-40  border-gray-300 my-4 "></div>

                        </div>
                    </div>

                    <button className=" flex justify-around items-center cursor-pointer gap-5 font-medium" onClick={() => toggel("price")}>FILTER PRICE <ChevronDown className="h-8 w-6 " /></button>
                    <div className={`grid transition-all duration-300 ease-in-out ${drop === "price" ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`} >
                        <div className="overflow-hidden flex flex-col gap-1 pl-4">
                            <button onClick={() => checkfilter("price", 50)} className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                $0.00 - $50.00
                            </button>
                            <button onClick={() => checkfilter("price", 150)} className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                $50.00 - $150.00
                            </button>
                            <button onClick={() => checkfilter("price", 350)} className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                $150.00 - $350.00
                            </button>
                            <div className="border-t w-40  border-gray-300 my-4 "></div>
                        </div>

                    </div>

                    <button className=" flex justify-around items-center cursor-pointer gap-5 font-medium" onClick={() => toggel("brand")}>FILTER PRICE <ChevronDown className="h-8 w-6 " /></button>
                    <div className={`grid transition-all duration-300 ease-in-out ${drop === "brand" ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"}`} >
                        <div className="overflow-hidden flex flex-col gap-1 pl-4">
                            <button className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                GUCCI
                            </button>
                            <button className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                LUIS
                            </button>
                            <button className="flex justify-start items-center cursor-pointer gap-5 font-medium py-1 text-gray-700 hover:text-black">
                                HERMES
                            </button>
                        </div>
                        <div className="border-t w-40  border-gray-300 my-4 "></div>
                    </div>
                </div >

                {/*second grid for products*/}
                <div className="col-span-3 ml-2 flex flex-wrap items-center gap-10">


                    {categry.map((item) => (
                        <div className="group w-56 flex flex-col gap-1 mb-4" key={item._id}>

                            {/* Image Container */}
                            <div className="h-60 w-56 bg-[#F3F2F8] overflow-hidden flex items-center justify-center rounded-md">
                                <img className="h-full w-full object-cover" src={item.image} alt={item.name} />
                            </div>

                            {/* Name aur Buttons ka Interactive Container */}
                            <div className="relative h-7 overflow-hidden my-1 w-full">

                                {/* 1. Default Product Name: Hover par upar slide ho kar gayab hoga */}
                                <p className="absolute inset-0 font-serif text-gray-800 truncate transition-all duration-300 ease-in-out opacity-100 transform translate-y-0 group-hover:opacity-0 group-hover:-translate-y-2">
                                    {item.name}
                                </p>

                                {/* 2. Buttons Container: Hover par neeche se smoothly upar aayega */}
                                {/* HINT: 'absolute inset-0 flex gap-2' lagane se dono buttons barabar barabar set ho jayein ge */}
                                <div className="absolute inset-0 flex gap-2 transition-all duration-300 ease-in-out opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">

                                    {/* Add to Cart Button */}
                                    <button className="flex-1 bg-black text-white text-[10px] font-semibold py-1 rounded shadow-sm cursor-pointer hover:bg-gray-800 text-center transition-colors">
                                        + CART
                                    </button>

                                    {/* Buy Now / Order Button */}
                                    <button className="flex-1 bg-emerald-600 text-white text-[10px] font-semibold py-1 rounded shadow-sm cursor-pointer hover:bg-emerald-700 text-center transition-colors">
                                        BUY NOW
                                    </button>

                                </div>

                            </div>

                            {/* Rating Stars */}
                            <div className="flex text-amber-400 text-xl">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="text-gray-300">★</span>
                            </div>

                            {/* Price */}
                            <p className="font-medium text-xl">${item.price}</p>
                        </div>
                    ))}


                </div>


            </div >

        </>
    )
}