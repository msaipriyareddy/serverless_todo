import AWS from 'aws-sdk'
import AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger.mjs'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('TodosAccess')

export class TodosAccess {
  constructor(
    docClient = new XAWS.DynamoDB.DocumentClient(),
    todosTable = process.env.TODOS_TABLE,
    createdAtIndex = process.env.TODOS_CREATED_AT_INDEX
  ) {
    this.docClient = docClient
    this.todosTable = todosTable
    this.createdAtIndex = createdAtIndex
  }

  async getTodosForUser(userId) {
    logger.info('Getting todos for user', { userId })

    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.createdAtIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    return result.Items
  }

  async createTodo(todoItem) {
    logger.info('Creating todo item', { todoItem })

    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: todoItem
      })
      .promise()

    return todoItem
  }

  async updateTodo(userId, todoId, updatedTodo) {
    logger.info('Updating todo', { userId, todoId, updatedTodo })

    await this.docClient
      .update({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        },
        UpdateExpression:
          'set #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ExpressionAttributeValues: {
          ':name': updatedTodo.name,
          ':dueDate': updatedTodo.dueDate,
          ':done': updatedTodo.done
        }
      })
      .promise()
  }

  async deleteTodo(userId, todoId) {
    logger.info('Deleting todo', { userId, todoId })

    await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        }
      })
      .promise()
  }

  async updateAttachmentUrl(userId, todoId, attachmentUrl) {
    logger.info('Updating attachment url', { userId, todoId, attachmentUrl })

    await this.docClient
      .update({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        },
        UpdateExpression: 'set attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
          ':attachmentUrl': attachmentUrl
        }
      })
      .promise()
  }
}
