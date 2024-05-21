import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {


    const task = await prisma.task.findUnique({
        // Where, para expresar la condicion de busqueda
        where: {
            id: Number(params.id)
        }
    })
    console.log(task);

    return NextResponse.json(task);
}

export async function PUT(request, { params }) {

    const data = await request.json();

    // Actualizamos parcialmente la tarea de esta manera (o todas las propiedades o algunas)
    const updatedTask = await prisma.task.update({
        where: {
            id: Number(params.id)
        },
        data: data
    })

    return NextResponse.json(updatedTask);
} 

export async function DELETE(request, { params }) {

    try {
        const deletedTask = await prisma.task.delete({
            where: {
                id: Number(params.id)
            }
        })
        console.log(deletedTask);

        return NextResponse.json(deletedTask);
    } catch (e) {
        return NextResponse.json(e.message);
    }

    
} 