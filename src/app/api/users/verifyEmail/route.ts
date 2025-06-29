import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

await connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token } = body;
        console.log("Received token: ", token);

        if (!token) {
            return NextResponse.json({error: "Token is required"}, {status: 400});
        }

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
        }

        console.log("User found: ", user);

        user.isVerified = true;
        user.verifyToken = null;
        user.verifyTokenExpiry = null;
        await user.save();

        return NextResponse.json({message: "Email verified successfully", success: true}, {status: 200});
    } catch (e: any) {
        console.error("Error in POST /api/users/verifyEmail: ", e.message);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
