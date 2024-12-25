import {React, lazy,Suspense} from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";

const Signup =lazy(()=>import ("./components/Signup"))
const Signin =lazy(()=>import ("./components/Signin"))
const Dashboard=lazy(()=>import ("./components/Dashboard"))
const Transfer=lazy(()=>import("./components/Transfer"))



function App(){
  return (

    <div>
     
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/transfer" element={<Transfer/>}/>
      </Routes>

      </Suspense>
      
      </BrowserRouter>
    </div>
  )
}


export default App;
