import connectDb from "@/helpers/connectdb";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectDb();

        const body = await req.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "missing field" }, { status: 400 });
        }

        if (role && role !== "user") {
            return NextResponse.json({ error: "Invalid role" }, { status: 400 });
        }


        const exsisting = await User.findOne({ email });
        if (exsisting) {
            return NextResponse.json({ error: "user already exists" }, { status: 409 });
        }


        const user = await User.create({
            name,
            email,
            password,
            role: role || "user"
        });

        const UserData = {
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        return NextResponse.json({
            message: "User successfully registered",
            user: UserData,
        },
            { status: 200 })

    } catch (error) {
        console.error("Registration error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}