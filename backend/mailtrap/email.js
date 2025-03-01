import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESSFULL_TEMPLATE
} from "./emailtemplates.js";
import { sender, mailtrapClient } from "./mailtrap.config.js";


export const sendPasswordResetRequestEmail = async (email, resetUrl) => {
    const recipient = [{ email }]
    try {
        const res = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset",
        })
        console.log("Password reset email sent successfully", res);
    } catch (error) {
        console.log("Error sending password reset email", error)
    }
}

export const sendPasswordResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const res = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESSFULL_TEMPLATE,
            category: "Password Reset Successfull"
        })
        console.log("Password updated email sent successfully", res);
    } catch (error) {
        console.log("Error sending password reset success email", error)
    }
}