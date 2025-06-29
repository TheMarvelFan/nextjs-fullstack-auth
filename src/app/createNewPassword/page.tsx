"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

export default function CreateNewPassword() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleCreateNewPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("/api/users/createNewPassword", { token, newPassword });
            if (response.data.success) {
                setMessage("Password updated successfully. You can now log in.");
                router.push("/login");
            } else {
                setError("Failed to update password.");
            }
        } catch (err: any) {
            console.error("Error updating password:", err);
            setError(err.response?.data?.error || "An error occurred.");
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Create New Password</h1>
            <form onSubmit={handleCreateNewPassword} className="flex flex-col space-y-4">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Update Password
                </button>
            </form>
            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
