import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(req: NextRequest) {
    try {
        const val = req.cookies.get("token")?.value || "";
        const data: any = jwt.verify(val, process.env.TOKEN_SECRET as string);

        return data.id;
    } catch (e: any) {
        throw new Error("Invalid token ", e.message);
    }
}
