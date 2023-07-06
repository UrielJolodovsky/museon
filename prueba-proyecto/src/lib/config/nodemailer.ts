import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email_user as string,
        pass: process.env.email_password as string
    }
})

export const emailPayload = (email: string) => {
    return {
        from: "museon.proyecto@gmail.com",
        to: email
    }
}