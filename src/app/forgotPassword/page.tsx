"use client";

import axios from "axios";
import React, { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post("/api/users/forgotPassword", { email });
            if (response.data.success) {
                setMessage("If the email exists, a reset link has been sent.");
            } else {
                setError("Failed to send reset link.");
            }
        } catch (err: any) {
            console.error("Error sending reset link:", err);
            setError(err.response?.data?.error || "An error occurred.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Forgot Password</h1>
            <form onSubmit={handleForgotPassword} className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Send Reset Link
                </button>
            </form>
            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
