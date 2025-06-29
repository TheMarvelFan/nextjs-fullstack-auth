import {NextRequest, NextResponse} from "next/server";
import {sendEmail} from "@/helpers/mailer";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

await connect();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email } = body;

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("reaching here 1");

    const user = await User.findOne({ email });

    console.log("reaching here 1.5");

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId: string = user._id.toString();

    console.log("reaching here 2");

    await sendEmail(email, "forgotPassword", userId);

    return NextResponse.json({ message: "If the email exists, a reset link has been sent.", success: true }, { status: 200 });
}
