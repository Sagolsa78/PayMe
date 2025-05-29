import React from "react"


const DownloadApp = () => {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-3xl font-bold mb-6">Download Paytm App</h2>
          <p className="text-xl mb-8">Get the best experience with our mobile app. Available on iOS and Android.</p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full flex items-center">
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </button>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full flex items-center">
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h11c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5h-11c-.83 0-1.5-.67-1.5-1.5zm3-16c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm0 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm0 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm0 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm0 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm3-12c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm0 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm0 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm0 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1zm0 3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v1c0 .28.22.5.5.5s.5-.22.5-.5v-1z" />
              </svg>
              Google Play
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src="/src/assets/paytm_download_image .avif"  alt="Paytm App" className="mx-auto size-96" />
        </div>
      </div>
    </section>
  )
}

export default DownloadApp

