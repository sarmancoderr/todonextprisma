import type { TodoModel } from 'prismamodule/todos'
import Head from 'next/head'
import { SyntheticEvent, useEffect, useState } from 'react'

export default function TodosForm() {
    const [todoText, setTodoText] = useState('')
    const [todosList, setTodosList] = useState<TodoModel[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => { loadTodos() }, [])

    const loadTodos = async () => {
        try {
            const todosRequest = await fetch('/api/todos')
            const { todos } = await todosRequest.json()
            setTodosList(todos)
        } catch (error: any) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (<p>Loading</p>)
    }

    if (error) {
        console.log(error)
        return (<p>error</p>)
    }

    async function addTodo(e: SyntheticEvent) {
        e.preventDefault();
        console.log('adding todo')

        try {
            const todosRequest = await fetch('/api/todos', {
                method: 'post',
                body: JSON.stringify({ todoText: todoText })
            })
            const { todo } = await todosRequest.json()
            setTodosList([...todosList, todo])
            setTodoText('')
        } catch (error: any) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const addformuser = (
        <form onSubmit={addTodo}>
            <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
            <button type='submit'>Añadir todo</button>
        </form>
    )

    if (todosList.length === 0) {
        return (
            <>
                <p>No hay usuarios</p>
                {addformuser}
            </>
        )
    }

    return (
        <div>
            <ul>
                {todosList.map((todo) => (<li key={todo.id}>{todo.todoText}</li>))}
            </ul>

            {addformuser}
        </div>
    )
}