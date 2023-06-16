import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'



export async function POST(req: NextRequest, res: NextResponse) {
    const prisma = new PrismaClient()
    try {
    const { email, name, password } = await req.json();
    console.log(email, name, password)
    if (email.length === 0 || name.length === 0 || password.length === 0) {
        return new Response("Missing fields", { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (existingUser) {
        return new Response("Email already in use", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: {
            email: email,
            name: name,
            hashedPassword: hashedPassword
        }
    })
    console.log(user)
    return new Response(user, {status: 200})
    } catch(error) {
        return new Response("Something went wrong", {status: 400})
    }
}