import React from "react";


const services = [
    { icon: "📱", title: "Recharge", description: "Prepaid, Postpaid, DTH" },
    { icon: "💳", title: "Pay Bills", description: "Electricity, Water, Gas" },
    { icon: "💰", title: "Loan", description: "Personal, Home, Car" },
    { icon: "✈️", title: "Book", description: "Flights, Bus, Train" },
    { icon: "🎬", title: "Entertainment", description: "Movies, Events" },
    { icon: "📈", title: "Invest", description: "Stocks, Mutual Funds" },
]


function ServiceCard() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {services.map((service, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                ))}

            </div>
            </div>
        </section>
    )



}

export default ServiceCard;
