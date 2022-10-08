export type {
    Todo as TodoModel,
    UserAccount as UserAccountModel
} from '@prisma/client'

import { PrismaClient, Todo, UserAccount } from "@prisma/client";
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

export async function createUser(payload: UserAccount) {
    const client = new PrismaClient()

    return client.userAccount.create({
        data: {
            ...payload,
            password: await bcrypt.hash(payload.password, 7)
        }
    })
}

export async function listUsers() {
    const client = new PrismaClient()

    return client.userAccount.findMany({})
}