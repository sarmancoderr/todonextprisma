import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from "next";
import { listUsers, createUser } from 'prismamodule/users'

const handler = nc<NextApiRequest, NextApiResponse>({
    onError(err, req, res, next) {
        console.log(err)
        res.status(500).json({
            msg: err.message,
            error: JSON.stringify(err)
        })
    }
})
    .get(async (req, res) => {
        console.log('HOLA MUNDO, AQUI LISTADO DE USUARIOS')
        res.status(200).json({
            users: await listUsers()
        })
    })
    .post(async (req, res) => {
        const user = await createUser(JSON.parse(req.body))
        res.status(201).json({user})
    })

export default handler