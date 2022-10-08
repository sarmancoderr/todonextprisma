export type {
    Todo as TodoModel
} from '@prisma/client'

import { PrismaClient, Todo } from "@prisma/client";
import bcrypt from 'bcrypt'

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
