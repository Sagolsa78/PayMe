import { React, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { ThemeProvider } from "./contex/ThemeProvider";

const Signup = lazy(() => import("./pages/Signup"))
const Signin = lazy(() => import("./pages/Signin"))
const Dashboard = lazy(() => import("./dashboard/DashboardPage"))
const Homepage = lazy(() => import("./pages/Homepage"))




function App() {
  return (

    <div>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<div className='items-center h-screen  flex justify-center'><HashLoader /></div>}>

            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Homepage />} />
            </Routes>

          </Suspense>

        </BrowserRouter>
      </ThemeProvider>


    </div>
  )
}


export default App;
