import React from "react";
import AppBar from "../components/Appbar";
import Balance from "../components/Balance";

import TransactionHistory from "../components/TransactionHistory";

function Dashboard(){
    return (
        <div>
            <div>
                <AppBar/>
            </div>
            <div>
                <Balance/>
                <TransactionHistory/>
            </div>
        </div>
    )
}

export default Dashboard;
