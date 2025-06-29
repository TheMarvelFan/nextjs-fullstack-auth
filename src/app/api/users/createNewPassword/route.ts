import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {connect} from "@/dbConfig/dbConfig";

await connect();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { newPassword, token } = body;

    if (!newPassword || !token) {
        return NextResponse.json({ error: "New password and forgot password token are required" }, { status: 400 });
    }

    try {
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "User not found or invalid token" }, { status: 404 });
        }

        user.password = await bcryptjs.hash(newPassword, 10);
        await user.save();

        return NextResponse.json({ message: "Password updated successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
