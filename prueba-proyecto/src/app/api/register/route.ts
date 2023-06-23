import { db } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'



export async function POST(req: Request, res: Response) {
    try {
    const { email, name, password } = await req.json();
    console.log(email, name, password)
    if (email.length === 0 || name.length === 0 || password.length === 0) {
        return new NextResponse("Missing fields", { status: 400 });
    }
    const existingUser = await db.user.findUnique({
        where: {
            email: email
        }
    })
    if (existingUser) {
        return new NextResponse("Email already in use", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await db.user.create({
        data: {
            email: email,
            name: name,
            hashedPassword: hashedPassword
        }
    })
    console.log(user)
    return NextResponse.json(user, {status: 200})
    } catch(error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse("Internal error", {status: 500})
    }
}