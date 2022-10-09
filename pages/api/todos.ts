import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from "next";
import { listTodos, createTodo } from 'prismamodule/todos'

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
        console.log('HOLA MUNDO, AQUI LISTADO DE TODOS')
        throw new Error('NO SE PUEDE CONSEGUIR TODOTEXT DE UNDEFINED')

        res.status(200).json({
            todos: await listTodos()
        })
    })
    .post(async (req, res) => {
        const todo = await createTodo(JSON.parse(req.body))
        res.status(201).json({todo})
    })

export default handler