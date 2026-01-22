import { getTodosForUser } from '../../businessLogic/todos.mjs'
import { getUserId } from '../../auth/utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('getTodos')

export async function handler(event) {
  try {
    logger.info('Processing getTodos event', { event })

    const userId = getUserId(event)
    const items = await getTodosForUser(userId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ items })
    }
  } catch (e) {
    logger.error('GetTodos failed', { error: e.message })

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}
