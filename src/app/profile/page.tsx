"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast";


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("");

    const getDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data);
            setData(res.data.data._id);
        } catch (e: any) {
            console.log("Error fetching user details: ", e.message);
            toast.error(e.message);
        }
    };

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged Out!");
        } catch (e: any) {
            console.log("Error logging out: ", e.message);
            toast.error(e.message);
        }
        router.push("/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <h2 className="p-3 rounded bg-green-400">
                {data ? <Link href={`/profile/${data}`}>Go to profile id {data}</Link> : "No user details fetched yet"}
            </h2>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mt-4"
                onClick={logout}
            >
                Logout
            </button>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 mt-4"
                onClick={getDetails}
            >
                Get User Details
            </button>
        </div>
    )
}
