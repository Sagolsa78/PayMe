import React from "react";




function Hero(){

    return <div>
        <section className="bg-blue-50 py-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">India's Most Loved payment platform</h1>
                <p className="text-xl mb-8">
                    Recharge & Pay bills, Books flights & movie Tickets, Open a saving account, invest in stocks & mutual funds, and do a lots more.
                </p>
                <button size="lg" className="bg-block text-white hover:bg-gray-800">
                    Download PayTm App
                </button>
                </div>
                <div className="md:w-1/2">
                <img src="/src/assets/paytm_hero.avif" alt="Paytm app" width={500} height={500} className="rounded-lg " />

                </div>
            </div>
        </section>

    </div>
}


export default Hero;
