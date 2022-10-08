export type {
    UserAccount as UserAccountModel
} from '@prisma/client'

import { PrismaClient, UserAccount } from "@prisma/client";
import bcrypt from 'bcrypt'

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