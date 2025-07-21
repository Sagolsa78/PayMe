import React from "react";
import AppBar from "../";
import Balance from "../components/Balance";

import { Users } from "../components/Users";



function Dashboard(){
    return (
        <div>
            <div>
                <AppBar/>
            </div>
            <div>
                <Balance/>
                <Users/>
            </div>
        </div>
    )
}

export default Dashboard;
