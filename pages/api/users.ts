import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from "next";
import { listUsers, createUser } from 'prismamodule'

const handler = nc<NextApiRequest, NextApiResponse>({})
    .get(async (req, res) => {
        res.status(200).json({
            users: await listUsers()
        })
    })
    .post(async (req, res) => {
        const user = await createUser(JSON.parse(req.body))
        res.status(201).json({user})
    })

export default handler