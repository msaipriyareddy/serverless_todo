import { v4 as uuidv4 } from 'uuid'
import { TodosAccess } from '../dataLayer/todosAccess.mjs'
import { getAttachmentUrl } from '../fileStorage/attachmentUtils.mjs'

const todosAccess = new TodosAccess()

export async function getTodosForUser(userId) {
  return await todosAccess.getTodosForUser(userId)
}

export async function createTodo(userId, createTodoRequest) {
  const todoId = uuidv4()
  const createdAt = new Date().toISOString()

  const newItem = {
    userId,
    todoId,
    createdAt,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false
  }

  return await todosAccess.createTodo(newItem)
}

export async function updateTodo(userId, todoId, updateTodoRequest) {
  await todosAccess.updateTodo(userId, todoId, updateTodoRequest)
}

export async function deleteTodo(userId, todoId) {
  await todosAccess.deleteTodo(userId, todoId)
}

export async function createAttachmentPresignedUrl(userId, todoId) {
  const attachmentUrl = getAttachmentUrl(todoId)
  await todosAccess.updateAttachmentUrl(userId, todoId, attachmentUrl)
  return attachmentUrl
}


