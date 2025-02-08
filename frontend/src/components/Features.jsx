import { CheckCircle } from "lucide-react"


const features = [
  "Pay anyone, everywhere",
  "Pay bills, recharge & more",
  "Book flights, trains & movies",
  "Invest in stocks & mutual funds",
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="/src/assets/paytm_service.avif"
            width={500}
            height={300}
            alt="Paytm Features"
            className="rounded-lg p-2 shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h2 className="text-3xl font-bold mb-6">Why Choose Paytm?</h2>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

