import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from "next";
import { listTodos, createTodo } from 'prismamodule'

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
        res.status(200).json({
            todos: await listTodos()
        })
    })
    .post(async (req, res) => {
        const todo = await createTodo(JSON.parse(req.body))
        res.status(201).json({todo})
    })

export default handler