import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import Features from "../components/Features";
import DownloadApp from "../components/DownloadApp";
import Footer from "../components/Footer";



function Homepage(){
    return <div className="flex flex-col min-h-screen">
        <Header/>
        <div className="flex-grow">
            <Hero/>
            <ServiceCard/>
            <Features/>
            <DownloadApp/>
        </div>
        <Footer/>
    </div>
}


export default Homepage;

