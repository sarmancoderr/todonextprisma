import { PrismaClient, Todo } from "@prisma/client";
export type { Todo as TodoModel } from '@prisma/client'

export async function createTodo(payload: Todo) {
    const client = new PrismaClient()

    return client.todo.create({
        data: payload
    })
}

export async function listTodos() {
    const client = new PrismaClient()

    return client.todo.findMany({})
}