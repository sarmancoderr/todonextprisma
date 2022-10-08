import { PrismaClient } from "@prisma/client";

export async function createTodo(payload: any) {
    const client = new PrismaClient()

    return client.todo.create({
        data: payload
    })
}

export async function listTodos() {
    const client = new PrismaClient()

    return client.todo.findMany({})
}