export function First() {
    return (
        <section className="bg-[#F3F2EE] px-24 min-h-screen">
            <div className="grid grid-cols-2 items-center gap-10 min-h-screen">

                <div className="ml-10">
                    <p className="text-[#E53637] tracking-[0.2em] uppercase text-lg">   Summer Collection   </p>

                    <h1 className="text-4xl font-bold text-[#111111] mt-6 leading-tight">  Fall - Winter <br /> Collections 2030 </h1>

                    <p className="text-gray-600 text-xl mt-6 max-w-xl leading-relaxed"> A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.  </p>

                    <button className="mt-10 bg-black text-white px-6 py-5 tracking-[0.2em] uppercase font-semibold">     Shop Now →  </button>
                </div>

                {/* Right: Image (ab grid ke andar hai) */}
                <div className="relative flex justify-center items-center">
                    <div className="absolute w-[500px] h-[600px]  bg-[#F3DCDC]" />
                    <img src="https://i.ibb.co/8LqfgFMh/model-removebg-preview.png" alt="Model" className="relative z-10 h-[600px] object-contain" />
                </div>
            </div>
        </section>
    );
}