import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";



function Homepage(){
    return <div>
        <Header/>
        <div className="">
            <Hero/>


        </div>


        
    </div>
}


export default Homepage;



// mport { Button } from "@/components/ui/button"
// import Image from "next/image"

// export default function Hero() {
//   return (
//     <section className="bg-blue-50 py-20">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
//         <div className="md:w-1/2 mb-10 md:mb-0">
//           <h1 className="text-4xl md:text-5xl font-bold mb-6">India's Most-loved Payments App</h1>
//           <p className="text-xl mb-8">
//             Recharge & pay bills, book flights & movie tickets, open a savings account, invest in stocks & mutual funds,
//             and do a lot more.
//           </p>
//           <Button size="lg" className="bg-black text-white hover:bg-gray-800">
//             Download Paytm App
//           </Button>
//         </div>
//         <div className="md:w-1/2">
//           <Image
//             src="/placeholder.svg?height=400&width=600"
//             width={600}
//             height={400}
//             alt="Paytm App"
//             className="rounded-lg shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }

