import {React, lazy,Suspense} from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";

const Signup =lazy(()=>import ("./pages/Signup"))
const Signin =lazy(()=>import ("./pages/Signin"))
const Dashboard=lazy(()=>import ("./pages/Dashboard"))
const Homepage=lazy(()=>import("./pages/Homepage"))



function App(){
  return (

    <div>
     
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Homepage/>}/>
      </Routes>

      </Suspense>
      
      </BrowserRouter>
    </div>
  )
}


export default App;
