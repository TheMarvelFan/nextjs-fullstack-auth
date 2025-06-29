import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async (to: string, type: string, userId: string) => {
    try {
        const hashedToken = await bcryptjs.hash(userId, 10);
        if (type === "verify") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        } else if (type === "forgotPassword") {
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000});
        }

        const MAIL_HOST = String(process.env.MAIL_HOST) || 'smtp.example.com';
        const MAIL_PORT = Number(process.env.MAIL_PORT) || 2020;
        const MAIL_USER = String(process.env.MAIL_USER) || "sample_user";
        const MAIL_PASS = String(process.env.MAIL_PASS) || "random_password";

        const transport = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            }
        });

        const mailOptions = {
            from: "nigampranshu665@gmail.com",
            to,
            subject: type === "verify" ? "Verify your account" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${type === "verify" ? "verifyemail" : "createNewPassword"}?token=${hashedToken}">here</a> to ${type === "verify" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${type === "verify" ? "verifyemail" : "createNewPassword"}?token=${hashedToken}
            </p>`
        }

        return await transport.sendMail(mailOptions);
    } catch (e: any) {
        console.error("Error sending email: ", e.message);
    }
};
