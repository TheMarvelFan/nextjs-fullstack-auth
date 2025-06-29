import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
    try {
        const id = await getDataFromToken(req);
        const user = await User.findById(id).select("-password -__v");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ status: 200, message: "User data retrieved successfully", data: user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
