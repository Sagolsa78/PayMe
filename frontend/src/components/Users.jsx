import { useEffect, useState } from "react";

import axios from "axios";

import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input
} from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";



export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setfilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <div className="p-5">
        <div className="font-bold mt-2 text-lg ">
            users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setfilter(e.target.value)
            }}
                type="text" placeholder="Search users...." className="w-full px-2 py-1 border rounded border-slate-200" />

        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </div>



    function User({ user }) {
        const [open, setOpen] = useState(false);
        const [amount, setAmount] = useState('')
        const handleOpen = () => setOpen((cur) => !cur);
        // const usertoken = localStorage.getItem("token")

        const transferReq = async () => {
            const usertoken = localStorage.getItem("token");

            try {
                const response = await axios.post(
                    "http://localhost:3000/api/v1/account/transfer",
                    {
                        to: user._id,
                        amount: amount
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${usertoken}`
                        }
                    }
                );

                console.log(response.data);
                alert("Transfer Successful");
                handleOpen();
            } catch (error) {
                console.error("Transfer Failed:", error.response ? error.response.data : error);
                alert("Transfer Failed. Check the console for more details.");
            }
        };





        return <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12  w-12 bg-slate-200 flex justify-center mt-1 mr-2 ">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname[0]}
                    </div>
                </div>
                <div className="flex flex-col justiify-center h-full">
                    <div>
                        {user.firstname}{user.lastname}
                    </div>
                </div>
            </div>

            <div>
                <Button onClick={handleOpen}>Send</Button>
                <Dialog
                    size="xs"
                    open={open}
                    handler={handleOpen}
                    className="bg-transparent justify-center items-center bg-black bg-opacity-50 fixed inset-0 z-50 shadow-none"
                    onClick={handleOpen}
                >
                    <Card className="w-full max-w-[24rem] mx-auto shadow-xl rounded-xl transition-transform duration-300 ease-in-out bg-white"
                       onClick={(e) => e.stopPropagation()}>
                    <CardBody className="flex flex-col gap-4">
                        <div className="font-serif font-bold text-base flex justify-between"  size={32}>
                            Fund Transfer
                            <RxCross2 className="bold m-2 cursor-pointer hover:bg-slate-400" onClick={handleOpen}/>
                        </div>
                        
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            The Amount would be transfer to the User's Account
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Transfering To : {user.firstname}{user.lastname}
                        </Typography>

                        <Typography className="-mb-2" variant="h6">
                            Amount
                        </Typography>
                        <Input placeholder="Enter the amount" value={amount} onChange={(e) => { setAmount(e.target.value) }} size="lg" />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" className="bg-blue-500" onClick={transferReq} fullWidth>
                            Send
                        </Button>

                    </CardFooter>
                </Card>
            </Dialog>

        </div>

        </div >

    }
}

