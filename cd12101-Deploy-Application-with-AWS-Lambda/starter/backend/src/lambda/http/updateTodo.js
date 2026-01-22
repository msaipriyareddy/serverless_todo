// export function handler(event) {
//   const todoId = event.pathParameters.todoId
//   const updatedTodo = JSON.parse(event.body)
  
//   // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
//   return undefined
// }
import { updateTodo } from '../../businessLogic/todos.mjs'
import { getUserId } from '../../auth/utils.mjs'

export async function handler(event) {
  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)

  await updateTodo(userId, todoId, updatedTodo)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
