import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const tasks = await prisma.task.findMany()
    console.log(tasks)

    return NextResponse.json(tasks)
} 

export async function POST(request) {

    const {title, description} = await request.json();
    
    const newTask = await prisma.task.create({
        // La propiedad data son las columnas que vamos a guardar
        data: {
            title,
            description
        }
    })
    console.log(newTask);
    return NextResponse.json(newTask);
} 