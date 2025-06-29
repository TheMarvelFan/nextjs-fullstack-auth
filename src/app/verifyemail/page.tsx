"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUser = async () => {
        try {
            const response = await axios.post("/api/users/verifyEmail", { token });
            if (response.data.success) {
                setVerified(true);
            } else {
                setError(true);
            }
        } catch (e: any) {
            setError(true);
            console.error("Error verifying email: ", e.response?.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUser();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">
                Verify Email
            </h1>
            <h2 className="p-2 bg-orange-500 text-white">
                {token ? `${token}` : "Token not found in URL."}
            </h2>
            {verified && (
                <div className="p-4 texxt-2xl bg-green-500 text-white">
                    <h2>Email verified successfully!</h2>
                    <p>Proceed to <Link className="text-blue-500" href="/login">Login</Link></p>
                </div>
            )}
            {error && (
                <div className="p-4 text-2xl bg-red-500 text-white">
                    Error
                </div>
            )}
        </div>
    );
}
