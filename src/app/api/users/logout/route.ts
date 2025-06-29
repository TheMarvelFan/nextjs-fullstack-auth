import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = NextResponse.json(
            {
                message: "Logout successful",
                success: true
            }
        );

        res.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0) // Set expiration to the past to clear the cookie
        });

        return res;
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
